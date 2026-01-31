// const express = require("express");
// const mongoose = require('mongoose');
// const collection = require("./Models/User");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { exec } = require('child_process');
// const fs = require('fs');
// const path = require('path');

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// mongoose.connect('mongodb://localhost:27017/miniproject');

// // Your existing routes
// app.post("/", async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const check = await collection.findOne({ email: email });

//         if (check) {
//             res.json("exist");
//         } else {
//             res.json("notexist");
//         }

//     } catch (e) {
//         console.error('Error checking user:', e);
//         res.json("fail");
//     }
// });

// app.post("/signup", async (req, res) => {
//     const { name, email, password } = req.body;

//     const data = {
//         name: name,
//         email: email,
//         password: password
//     };

//     try {
//         const check = await collection.findOne({ email: email });

//         if (check) {
//             res.json("exist");
//         } else {
//             res.json("notexist");
//             await collection.insertMany([data]);
//         }

//     } catch (e) {
//         console.error('Error signing up user:', e);
//         res.json("fail");
//     }
// });

// // Merge videos API endpoint
// app.post("/merge-videos", async (req, res) => {
//     const { innings, actions } = req.body;

//     // Directory paths where the videos are stored
//     const directoryPath = path.join(__dirname, `./${innings}/${actions}`);
//     const outputFolderPath = path.join(directoryPath, 'outputFolder');

//     // Create the output folder if it doesn't exist
//     if (!fs.existsSync(outputFolderPath)) {
//         fs.mkdirSync(outputFolderPath, { recursive: true });
//     }

//     // Read all files in the directory
//     fs.readdir(directoryPath, (err, files) => {
//         if (err) {
//             console.error('Error reading directory:', err);
//             return res.status(500).json({ error: 'An error occurred while reading directory.' });
//         }

//         // Filter out non-video files (modify if necessary)
//         const videoFiles = files.filter(file => file.endsWith('.mp4'));

//         if (videoFiles.length < 2) {
//             return res.status(400).json({ error: 'Insufficient videos for merging.' });
//         }

//         // Construct input files string for FFmpeg
//         const inputFilesString = videoFiles.map(file => `-i "${path.join(directoryPath, file)}"`).join(' ');

//         // Construct output file path
//         const mergedVideoPath = path.join(outputFolderPath, `merged_${innings}_${actions}.mp4`);

//         // Construct FFmpeg command to merge videos
//         const ffmpegCommand = `ffmpeg ${inputFilesString} -filter_complex "[0:v] [0:a] [1:v] [1:a] concat=n=${videoFiles.length}:v=1:a=1 [v] [a]" -map "[v]" -map "[a]" -c:v libx264 -c:a aac "${mergedVideoPath}"`;

//         // Execute FFmpeg command
//         exec(ffmpegCommand, (error, stdout, stderr) => {
//             if (error) {
//                 console.error('Error merging videos:', error);
//                 return res.status(500).json({ error: 'An error occurred while merging videos.' });
//             }

//             console.log('Videos merged successfully.');
//             res.json({ message: 'Videos merged successfully.', mergedVideoPath });
//         });
//     });
// });
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require("express");
const mongoose = require('mongoose');
const collection = require("./Models/User");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path'); 
//to clip videos
const chokidar = require('chokidar');
const { exec } = require('child_process'); //for video merging 
const fse = require('fs-extra');  //for copying the mergedVideo and pasting into one folder

//for schema 
const User=require("./Models/User")

const { spawn } = require('child_process'); //for model.py 
const { match } = require("assert");

const axios = require("axios");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/miniproject');

// Your existing routes
app.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
        }

    } catch (e) {
        console.error('Error checking user:', e);
        res.json("fail");
    }
});

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const data = {
        name: name,
        email: email,
        password: password
    };

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
            await collection.insertMany([data]);
        }

    } catch (e) {
        console.error('Error signing up user:', e);
        res.json("fail");
    }
});





// Merge videos API endpoint
app.post("/merge-videos", async (req, res) => {
    const { innings, actions } = req.body;

    // Directory paths where the videos are stored
    const directoryPath = path.join(__dirname, `./${actions}`);
    const outputFolderPath = path.join(__dirname, 'outputFolder');

    // Create the output folder if it doesn't exist
    if (!fs.existsSync(outputFolderPath)) {
        fs.mkdirSync(outputFolderPath, { recursive: true });
    }

    // Read all files in the directory
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ error: 'An error occurred while reading directory.' });
        }

        // Filter out non-video files (modify if necessary)
        const videoFiles = files.filter(file => file.endsWith('.mp4'));
        if (videoFiles.length < 1) {
            return res.status(400).json({ error: 'Insufficient videos for merging.' });
        }

        // Construct input files array with absolute paths
        const inputFiles = videoFiles.map(file => path.join(directoryPath, file));
        console.log('Input files:', inputFiles);

        // Construct output file path
       // const mergedVideoPath = path.join(outputFolderPath, 'merged.mp4'); // Fixed filename without timestamp
       const timestamp = Date.now(); // Unique identifier
       const mergedVideoPath = path.join(outputFolderPath, `merged_${timestamp}.mp4`);

        // // Delete the previous merged video file if it exists
        // if (fs.existsSync(mergedVideoPath)) {
        //     fs.unlinkSync(mergedVideoPath);
           
        //     console.log('Previous merged video deleted.');
        // }

        // Create a list file containing the list of input files
        const listFilePath = path.join(outputFolderPath, 'fileList.txt');
        fs.writeFileSync(listFilePath, inputFiles.map(file => `file '${file}'`).join('\n'));

        // Construct the ffmpeg command to merge the videos
        const ffmpegCommand = `ffmpeg -f concat -safe 0 -i ${listFilePath} -c copy ${mergedVideoPath}`;

        // Execute the ffmpeg command
        exec(ffmpegCommand, (error, stdout, stderr) => {
            if (error) {
                console.error('Error merging videos:', error);
                console.error('FFmpeg output:', stdout);
                console.error('FFmpeg stderr:', stderr);
                return res.status(500).json({ error: 'An error occurred while merging videos.' });
            }
            console.log('Videos merged successfully.');
            // res.json({ message: 'Videos merged successfully.', mergedVideoPath });

            // Log the merged video path
            console.log('Merged Video Path:', mergedVideoPath);
           
            // Send the merged video path back to the frontend
            res.json({ mergedVideoPath });
        });
    });
});




// Define a route to serve the latest merged video file
app.get('/video', (req, res) => {
    // Get the latest merged video file in the output folder
    const outputFolderPath = path.join(__dirname, 'outputFolder');
    const files = fs.readdirSync(outputFolderPath);
    const latestMergedVideo = files.filter(file => file.startsWith('merged')).sort().reverse()[0];
   
    
    if (!latestMergedVideo) {
        return res.status(404).json({ error: 'Merged video file not found.' });
    }

    const videoPath = path.join(outputFolderPath, latestMergedVideo);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});


//clip videos


let videoPaths = [];


// Use the cors middleware
app.use(cors());

// Watch the videos folder for changes
const watcher = chokidar.watch('output', { persistent: true });
watcher.on('add', (filePath) => {
    const normalizedPath = filePath.replace(/\\/g, '/'); // Replace backslashes with forward slashes
    if (path.extname(normalizedPath) === '.mp4') {
        videoPaths.push(normalizedPath);
    }
});
//const api=require('../algoritham/API/index')

app.get('/stream-videos', (req, res) => {
   

    const videos = videoPaths.map((videoPath) => {
        // fro model running

        const videoStat = fs.statSync(videoPath);
        const fileSize = videoStat.size;
        return {
            path: videoPath,
            size: fileSize
        };
    });

    res.json(videos);
});


//api from api folder


app.get('/predictions', (req, res) => {
 

    const match = req.query.match;
    
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // res.writeHead(200,{
    //     'Content-Type': 'text/event-stream',
    //     'Cache-Control': 'no-cache',
    //     'Connection': 'keep-alive'
    // })
  
    const videoFilePath = `/Users/MaxNewton/Desktop/new2/frontend/src/highlights/${match}.mp4`;  // Replace with the actual path to your video
    const pythonProcess = spawn('python3', ['model.py', videoFilePath]);
  
    pythonProcess.stdout.on('data', (data) => {
      const result = data.toString().trim(); // Trim any extra whitespace
      if (result.startsWith("Prediction:")) {
        console.log(result); // Output the prediction result
        res.write(`data: ${result}\n\n`); // Send the prediction result to the frontend
      }
    });
  
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python Error: ${data}`);
      
    });
  
    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
      if (code === 0) {
        res.write(`data: Prediction process completed\n\n`);
        res.end(); // End SSE connection if Python process exits with code 0
      }
    });
  });
  







app.get('/stream-video/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < videoPaths.length) {
        const videoPath = videoPaths[index];
        const videoStat = fs.statSync(videoPath);
        const fileSize = videoStat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    } else {
        res.status(404).end('Video not found');
    }
});


  

// API endpoint to receive quiz score data
app.post('/score', async (req, res) => {
    const { email, score, totalQuestions } = req.body;
    console.log('Received score data:', { email, score, totalQuestions });
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.scores.push({ score, totalQuestions });
      await user.save();
      res.status(200).json({ message: 'Score received and saved successfully' });
    } catch (error) {
      console.error('Error saving score:', error);
      res.status(500).json({ message: 'Error saving score' });
    }


  });

  //api for leaderboard
app.get('/leaderboard', async (req, res) => {
    try {
      const users = await User.find({}, 'name email scores.score').sort({ 'scores.score': -1 });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Error fetching leaderboard' });
    }
  });
  
  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


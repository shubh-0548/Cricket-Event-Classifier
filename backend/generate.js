const fs = require('fs');

const ffmpeg = require('fluent-ffmpeg');

const { exec } = require('child_process');

const path = require('path');



// Function to merge videos

const mergeVideos = async (req, res) => {

    const { innings, actions } = req.body;



    // Directory paths where the videos are stored

    const directoryPath = path.join(__dirname, `./${innings}/${actions}`);

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

        const mergedVideoPath = path.join(outputFolderPath, 'merged.mp4'); // Fixed filename without timestamp



        // Delete the previous merged video file if it exists

        if (fs.existsSync(mergedVideoPath)) {

            fs.unlinkSync(mergedVideoPath);

            console.log('Previous merged video deleted.');

        }



        // Create a list file containing the list of input files

        const listFilePath = path.join(outputFolderPath, 'fileList.txt');

        fs.writeFileSync(listFilePath, inputFiles.map(file => `file '${file}'`).join('\n'));



        // Construct the ffmpeg command to merge the videos

        const ffmpegCommand = `-f concat -safe 0 -i ${listFilePath} -c copy ${mergedVideoPath}`;



        // Execute the ffmpeg command

        exec(`ffmpeg ${ffmpegCommand}`, (error, stdout, stderr) => {

            if (error) {

                console.error('Error merging videos:', error);

                console.error('FFmpeg output:', stdout);

                console.error('FFmpeg stderr:', stderr);

                return res.status(500).json({ error: 'An error occurred while merging videos.' });

            }

            console.log('Videos merged successfully.');



            // Log the merged video path

            console.log('Merged Video Path:', mergedVideoPath);



            // Send the merged video path back to the frontend

            res.json({ mergedVideoPath });

        });

    });

};



// Function to serve the latest merged video

const serveMergedVideo = (req, res) => {

    const outputFolderPath = path.join(__dirname, 'outputFolder');

    const files = fs.readdirSync(outputFolderPath);

    const latestMergedVideo = files.filter(file => file.startsWith('merged_')).sort().reverse()[0];

    

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

};



module.exports = {

    mergeVideos,

    serveMergedVideo

};
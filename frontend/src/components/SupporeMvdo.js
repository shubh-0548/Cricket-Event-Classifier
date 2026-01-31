

// // //working project

// // import React, { useState, useEffect } from "react";
// // // import AA from './AA';
// // import "./SupporeMvdo.css"; // Import your CSS file
// // //import './App.css';

// // function SupporeMvdo() {
// //   const [videos, setVideos] = useState([]);
// //   const [data,setdata]=useState([]);
// //   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

// //   const fetchVideos = async () => {
// //     const response = await fetch("http://localhost:4000/stream-videos");
// //     const data = await response.json();
// //     setVideos(data);
// //   };

// //   useEffect(() => {
// //     fetchVideos();

// //     const intervalId = setInterval(() => {
// //       fetchVideos();
// //     }, 5000); // Fetch videos every 5 seconds

// //     return () => clearInterval(intervalId);
// //   }, []);

// //   const handlePlayNextVideo = () => {
    
   
// //    fetch("http://localhost:4000/predictions",{

// //    });
  

// //   };

// //   return (
// //     <>
// //       {" "}
      
// //       <div className="App1">
// //         <h1 style={{ color: "white" }}>AI Generated Clips!</h1>
// //         <div className="video-container1">
// //           {videos.map((video, index) => (
// //             <video
// //               key={index}
// //               controls
// //               autoPlay={index === currentVideoIndex}
// //               className="video1"
// //             >
// //               <source
// //                 src={`http://localhost:4000/stream-video/${index}`}
// //                 type="video/mp4"
// //               />
// //             </video>
// //           ))}
// //         </div >
// //          <button style={{marginRight:"200px", marginTop:"20px", width:"150px",height:"50px"}} onClick={handlePlayNextVideo}>Generate Clips</button> 
// //       </div>
// //       {/* <AA/> */}
// //     </>
// //   );
// // }

// // export default SupporeMvdo;

// // //working project

// // import React, { useState, useEffect } from "react";
// // import "./SupporeMvdo.css";

// // function SupporeMvdo() {
// //   const [videos, setVideos] = useState([]);
// //   const [predictions, setPredictions] = useState([]);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [eventSource, setEventSource] = useState(null);

// //   const fetchVideos = async () => {
// //     try {
// //       const response = await fetch("http://localhost:4000/stream-videos");
// //       const data = await response.json();
// //       setVideos(data);
// //     } catch (error) {
// //       console.error("Error fetching videos:", error);
// //     }
// //   };

// //   const fetchPredictions = () => {
// //     if (!isProcessing) {
// //       setIsProcessing(true);
// //       const newEventSource = new EventSource("http://localhost:4000/predictions");
// //       newEventSource.onmessage = (event) => {
// //         const newPrediction = event.data.trim();
// //         setPredictions((prevPredictions) => [...prevPredictions, newPrediction]);
// //       };
// //       setEventSource(newEventSource);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchVideos();
// //     const videoInterval = setInterval(fetchVideos, 5000); // Fetch videos every 5 seconds
// //     return () => clearInterval(videoInterval);
// //   }, []);

// //   useEffect(() => {
// //     return () => {
// //       if (eventSource) {
// //         eventSource.close();
// //         setEventSource(null);
// //       }
// //     };
// //   }, [eventSource]);

// //   const handleFetchPredictions = () => {
// //     fetchPredictions();
// //   };

// //   return (
// //     <>
// //       <div className="App1">
// //         <h1 style={{ color: "white" }}>AI Generated Clips!</h1>
// //         <div className="video-container1">
// //           {videos.map((video, index) => (
// //             <video
// //               key={index}
// //               controls
// //               autoPlay={index === 0}
// //               className="video1"
// //             >
// //               <source
// //                 src={`http://localhost:4000/stream-video/${index}`}
// //                 type="video/mp4"
// //               />
// //             </video>
// //           ))}
// //         </div>
// //         <button
// //           style={{ marginRight: "200px", marginTop: "20px", width: "150px", height: "50px" }}
// //           onClick={handleFetchPredictions}
// //           disabled={isProcessing} // Disable button while processing predictions
// //         >
// //           Generate Predictions
// //         </button>
// //         <div style={{ marginTop: "20px", color: "white" }}>
// //           Predictions:
// //           <ul>
// //             {predictions.map((prediction, index) => (
// //               <li key={index}>{prediction}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default SupporeMvdo;


// // //perfect code 
// import React, { useState, useEffect } from "react";
// import "./SupporeMvdo.css";

// function SupporeMvdo() {
//   const [videos, setVideos] = useState([]);
//   const [predictions, setPredictions] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [eventSource, setEventSource] = useState(null);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch("http://localhost:4000/stream-videos");
//       const data = await response.json();
//       setVideos(data);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   const fetchPredictions = () => {
//     if (!isProcessing && !eventSource) {
//       setIsProcessing(true);
//       const newEventSource = new EventSource("http://localhost:4000/predictions");
//       newEventSource.onmessage = (event) => {
//         const newPrediction = event.data.trim();
//         if (newPrediction === "Prediction process completed") {
//           setIsProcessing(false); // Reset isProcessing when prediction process completes
//           newEventSource.close(); // Close SSE connection
//         } else {
//           setPredictions((prevPredictions) => [...prevPredictions, newPrediction]);
//         }
//       };
//       setEventSource(newEventSource);
//     }
//   };

//   useEffect(() => {
//     fetchVideos();
//     const videoInterval = setInterval(fetchVideos, 5000); // Fetch videos every 5 seconds
//     return () => clearInterval(videoInterval);
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (eventSource) {
//         eventSource.close();
//         setEventSource(null);
//       }
//     };
//   }, [eventSource]);

//   const handleFetchPredictions = () => {
//     fetchPredictions();
//   };

//   return (
//     <>
//       <div className="App1">
//       <div ><h2 style={{color:"white", marginTop:"-45px"}}>AI Generated Clips</h2></div>
//         <div className="match-container">
         
//           <div className="prediction-match">
          
//             <div>Classification:</div>
//             <ul>
//               {predictions.map((prediction, index) => (
//                 <li key={index}>{prediction}</li>
//               ))}
//             </ul>
//           </div>
//           <div className="video-container1">
//             {videos.map((video, index) => (
//               <video key={index} controls autoPlay={index === 0} className="video1">
//                 <source src={`http://localhost:4000/stream-video/${index}`} type="video/mp4" />
//               </video>
//             ))}
//           </div>
//         </div>
//         <button
//           style={{ marginTop: "20px", width: "150px", height: "50px" }}
//           onClick={handleFetchPredictions}
//           disabled={isProcessing || !!eventSource}
//         >
//           Generate Clips
//         </button>
//       </div>
//     </>
//   );
  
// }

// export default SupporeMvdo;

// //prefect code




// // // test perfect code this code runs --have to keep this 
import React, { useState, useEffect } from "react";
import "./SupporeMvdo.css";

function SupporeMvdo(props) {
  const [videos, setVideos] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [eventSource, setEventSource] = useState(null);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:4000/stream-videos");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  

    // Make fetch request to the backend prediction API
    const fetchPredictions = () => {
      const match = props.vdo;
      if (!isProcessing && !eventSource) {
        setIsProcessing(true);
        const url = `http://localhost:4000/predictions?match=${match}`;
        const newEventSource = new EventSource(url);
        newEventSource.onmessage = (event) => {
          const newPrediction = event.data.trim();
          if (newPrediction === "Prediction process completed") {
            setIsProcessing(false);
            newEventSource.close();
          } else {
            setPredictions((prevPredictions) => [...prevPredictions, newPrediction]);
          }
        };
        setEventSource(newEventSource);
      }
    
      
    };
  useEffect(() => {
    fetchVideos();
    const videoInterval = setInterval(fetchVideos, 5000); // Fetch videos every 5 seconds
    return () => clearInterval(videoInterval);
  }, []);

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
    };
  }, [eventSource]);

  const handleFetchPredictions = () => {
    fetchPredictions();
  };

  return (
    <>
      <div className="App1">
        <div>
          <h2 style={{ color: "white", marginTop: "-45px" }}>AI Generated Clips</h2>
        </div>
        <div className="match-container">
          <div className="prediction-match">
            <div>Classification:</div>
            <ul>
              {predictions.map((prediction, index) => (
                <li key={index}>{prediction}</li>
              ))}
            </ul>
          </div>
          <div className="video-container1">
            {videos.map((video, index) => (
              <video key={index} controls autoPlay={index === 0} className="video1">
                <source src={`http://localhost:4000/stream-video/${index}`} type="video/mp4" />
              </video>
            ))}
          </div>
        </div>
        <button
          style={{ marginTop: "20px", width: "150px", height: "50px" }}
          onClick={handleFetchPredictions}
          disabled={isProcessing || !!eventSource}
        >
          Generate Clips
        </button>
      </div>
    </>
  );
}

export default SupporeMvdo;

// // //have to keep this ends



// import React, { useState } from 'react';
// import Cards from './Cards';
// import './Highlight.css';
// import Navbar from './Navbar';
// import axios from 'axios'; // Import Axios for making HTTP requests
// import Vdo from './Vdo';

// const Highlight = () => {
  
//   const highlights = [
//     { title: "AU vs IN", img: "AUvsIN" },
//     { title: "AU vs PK", img: "AUvsPK" },
//     { title: "AU vs WI", img: "AUvsWI" },
//     { title: "IN vs PK", img: "INvsPK" },
//     { title: "IN vs SA", img: "INvsSA" }
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [innings, setInnings] = useState('');
//   const [actions, setActions] = useState('');

//   const handlePrevClick = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? highlights.length - 1 : prevIndex - 1));
//   };

//   const handleNextClick = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === highlights.length - 1 ? 0 : prevIndex + 1));
//   };

//   const handleSaveMatchDetails = async () => {
//     // Retrieve the selected values from the state
//     const selectedInnings = innings;
//     const selectedActions = actions;
  
//     // Validate if both selections are made
//     if (!selectedInnings || !selectedActions) {
//       alert('Please select both innings and actions.');
//       return;
//     }
  
//     // Construct data object with match details
//     const dataToSave = {
//       innings: selectedInnings,
//       actions: selectedActions
//     };
//   console.log(dataToSave);
//     try {
//       // Make POST request to backend API to merge videos
//       const response = await axios.post('http://localhost:4000/merge-videos', dataToSave);
//       console.log('Merge response:', response.data);
//       // Further actions after successful merging, if needed
//     } catch (error) {
//       console.error('Error merging videos:', error);
//       // Handle error, show error message to user, etc.
//     }

//     // Clear input fields after saving
//     setInnings('');
//     setActions('');
//   };
  
//   return (
//     <div>
//       <Navbar />
//       <div className="highlight-container">
//         <div className="trending-text">TREND </div>
//         <div className="highlight-card-container">
//           <div className="highlight-scroll" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//             {highlights.map((highlight, index) => (
//               <Cards
//                 key={index}
//                 title={highlight.title}
//                 img={highlight.img}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="navigation-buttons">
//           <button className="prev-button" onClick={handlePrevClick}><i className="fa fa-arrow-left"></i></button>
//           <button className="next-button" onClick={handleNextClick}><i className="fa fa-arrow-right"></i></button>
//         </div>
//         <div className="trending-text" style={{ position: 'relative', top: '-20px', textAlign: 'right' }}>SETTERS</div>
//       </div>
//       {/* Video Container */}
//       <div className="video-container">
//         {/* Video component goes here */}
//       </div>
//       {/* Options Container */}
//       <div className="options-container">
//         <div style={{display:"flex"}}>
//         <div className="form-container">
//           <h2>Enter Match Details</h2>
//           <select value={innings} onChange={(e) => setInnings(e.target.value)}>
//             <option value="">Select Innings</option>
//             <option value="innings1">Innings 1</option>
//             <option value="innings2">Innings 2</option>
//             <option value="Both">Both</option>
//           </select>
//           <select value={actions} onChange={(e) => setActions(e.target.value)}>
//             <option value="">Select Actions</option>
//             <option value="Wickets">Wickets</option>
//             <option value="Boundary">Boundary</option>
//             <option value="Both">Both</option>
//           </select>
//           <button onClick={handleSaveMatchDetails}>Save Match Details</button>
//         </div>
//         <div className="vdo">
//               <Vdo vd="INvsSA"/>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Highlight;


import React, { useState } from 'react';
import Cards from './Cards';
import './Highlight.css';
import Navbar from './Navbar'; 
import axios from 'axios';
// import Vdo from './Vdo';
const Highlight = () => {
 const highlights = [
 { title: "AU vs IN", img: "AUvsIN" },
 { title: "AU vs PK", img: "AUvsPK" },
 { title: "AU vs WI", img: "AUvsWI" },
 { title: "IN vs PK", img: "INvsPK" },
 { title: "IN vs SA", img: "INvsSA" }
 ];
 const [currentIndex, setCurrentIndex] = useState(0);
 const [innings, setInnings] = useState('');
 const [actions, setActions] = useState('');
 const [mergedVideoUrl, setMergedVideoUrl] = useState('');



 const handlePrevClick = () => {
 setCurrentIndex((prevIndex) => (prevIndex === 0 ? highlights.length - 1 :
prevIndex - 1));
 };
 const handleNextClick = () => {
 setCurrentIndex((prevIndex) => (prevIndex === highlights.length - 1 ? 0 :
prevIndex + 1));
 };
 
 const handleSaveMatchDetails = async () => {
    const selectedInnings = innings;
    const selectedActions = actions;
    if (!selectedInnings || !selectedActions) {
        alert('Please select both innings and actions.');
        return;
    }
    const dataToSave = {
        innings: selectedInnings,
        actions: selectedActions
    };
    try {
        const response = await axios.post('http://localhost:4000/merge-videos', dataToSave);
        console.log('Merge response:', response.data);
        // Further actions after successful merging, if needed
        console.log('Merge response:', response.data); // Log the response data
         // Set the merged video URL in state
         setMergedVideoUrl(response.data.mergedVideoPath);

    } catch (error) {
        console.error('Error merging videos:', error);
        alert('An error occurred while merging videos. Please try again.');
    }
    setInnings('');
    setActions('');
};


 return (
 <div>
 <Navbar />
 <div className="highlight-container">
 <div className="trending-text">TREND </div>
 <div className="highlight-card-container">
 <div className="highlight-scroll" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
 {highlights.map((highlight, index) => (
 <Cards
 key={index}
 title={highlight.title}
 img={highlight.img}
 />
 ))}
 </div>
 </div>
 <div className="navigation-buttons">
 <button className="prev-button" onClick={handlePrevClick}><i
className="fa fa-arrow-left"></i></button>
 <button className="next-button" onClick={handleNextClick}><i
className="fa fa-arrow-right"></i></button>
 </div>
 <div className="trending-text" style={{ position: 'relative', top: '-20px',
textAlign: 'right' }}>SETTERS</div>
 </div>
 <div className="background">
      {/* Your content here */}
    </div>
 <div className="video-container">
    {/* Video component goes here */}
    
    {mergedVideoUrl && (
        <video className="custom-video" controls>
            <source src={`http://localhost:4000/video`} type="video/mp4" />
        </video>
    )}

</div>
<div style={{ marginTop: '20px' }}>
  <h1 style={{ fontFamily: 'Arial ', fontSize: '120px'}}>Customize Match Highlights!</h1>
</div>
 <div className="options-container">
    
<div style={{ display: "flex" }}>

 <div className="form-container">

 <h2>Enter Match Details</h2>
 <select value={innings} onChange={(e) => setInnings(e.target.value)}>
 <option value="">Select Innings</option>
 <option value="innings1">Innings 1</option>
 <option value="innings2">Innings 2</option>
 <option value="Both">Both</option>
 </select>
 <select value={actions} onChange={(e) => setActions(e.target.value)}>
 <option value="">Select Actions</option>
 <option value="wicket">Wickets</option>
 <option value="boundry">Boundary</option>
 <option value="Both">Both</option>
 </select>
 <button onClick={handleSaveMatchDetails}>Save Match Details</button>
 </div>
 {/* <div className="vdo">
 <Vdo vd="INvsSA"/> 
 </div>*/}
 </div>
 </div>
<div className='backgroundtotal'>

</div>
 

 </div>

 
 );
};
export default Highlight;

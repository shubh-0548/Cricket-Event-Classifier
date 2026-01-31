import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Match.css';

const MatchCard = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleHover = () => {
    setIsFlipped(!isFlipped);
  };
  // const handleLinkClick = async () => {
  //   try {
  //     const response = await fetch('http://localhost:4000/matchlink', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Add any other headers as needed
  //       },
  //       body: JSON.stringify({
  //         vd1: props.vd1,
  //         // Add any other data you want to send to the backend
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log('API response:', data);
  //     // Handle the API response as needed
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Handle errors if the API call fails
  //   }
  // };
  return (
    <div className="super">
      <Link to={`/Mvdo/${props.vd1}`} className="flag-link"> {/* Pass vd1 prop as part of the URL route */}
      {/* Text above the rectangle-container */}
        <div className="rectangle-container">
          <div className="text-overlay">
            {props.team1}
          </div>
          <div className="horizontal-line top"></div>
          <div className="flag-container">
            <img src={require(`../img/${props.team1Flag}.jpeg`)} alt="" className='flag-img' />
          </div>
          <div className="vs-container">
            <div className="vs-circle">VS</div>
          </div>
          <div className="flag-container">
            <img src={require(`../img/${props.team2Flag}.jpeg`)} alt="" className='flag-img' />
          </div>
          <div className="horizontal-line bottom"></div>
        </div>
      </Link>
      <div className="bottom">
        {props.team2}
      </div>
      {/* Text below the rectangle-container */}
      <div className="des" onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <div className={`front ${isFlipped ? 'hidden' : ''}`}>
          {/* Add your front content here (if any) */}
        </div>
        <div className={`back ${isFlipped ? '' : 'hidden'}`}>
          {props.description}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;

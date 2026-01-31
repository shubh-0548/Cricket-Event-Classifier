import React from 'react';
import './horizontal.css'; 

const HorizontalBox = ({ data }) => {
  return (
    <div className="horizontal-box">
      {data.map((item, index) => (
        <div key={index} className={`box ${index % 2 === 0 ? 'left' : 'right'}`}>
          <img src={item.image} alt={`Item ${index + 1}`} className="box-image" />
          <div className={`box-content ${index === 1 ? 'right-content' : 'left-content'}`}>
            <h2>{item.heading}</h2>
            <p>{item.paragraph}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HorizontalBox;
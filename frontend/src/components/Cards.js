import React from 'react';
import './card.css';

const Cards = (props) => {
  return (
    <div className={props.visible ? 'visible' : 'hidden'}>
      <div className="my-3 card">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <video className="card-video" controls>
            <source src={require(`../highlights/${props.img}.mp4`)} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

export default Cards;

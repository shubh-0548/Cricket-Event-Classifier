import React from 'react';
import './Vdo.css';

const Vdo = (props) => {
    return (
        <div>
            <main className='vid'>
                <video width="800px" height="600px" controls autoPlay={true}>
                    <source src={props.vd} type="video/mp4" />
                </video>
            </main>
        </div>
    );
};

export default Vdo;

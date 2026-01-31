
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Leaderboard.css'; // Assuming your CSS file is named Leaderboard.css
import Image from  '../img/leaderb.jpeg';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const userEmail = sessionStorage.getItem('userEmail');

  useEffect(() => {
    axios.get('http://localhost:4000/leaderboard')
      .then(response => {
        setLeaderboard(response.data);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
      });
  }, []);

  return (
    <div>
      <Navbar/>
      <h1 style={{textAlign:"center",marginTop:"20px",fontSize:"70px"}}>Leaderboard 🏆 </h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Email</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user.email} className={user.email === userEmail ? "highlighted-row you" : "highlighted-row"}>
              <td>{index === 0 ? <span className="gold" style={{fontSize:"30px"}}>🥇</span> : index === 1 ? <span className="silver" style={{fontSize:"25px"}} >🥈</span> : index + 1}</td>
              <td>{user.email === userEmail ? "YOU" : user.name}</td>
              <td>{user.email}</td>
              <td>{user.scores.length > 0 ? user.scores[0].score : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="right-box">
          <div>
            <img src={Image} style={{height:"500px",width:"400px", marginLeft:"30px"}}></img>
         
          </div>
          <div>
          <h1 style={{ marginLeft:"70px" }}>Khel Aur Khushi: Unleash the Magic of Quizzes for a Chance to Win Unforgettable Surprises!</h1>
          
         <p style={{ marginLeft:"70px",fontSize:"25px",marginTop:"30px" }}>Dive into a world of excitement and delight with our captivating quizzes! Embark on a journey where every question unlocks a treasure trove of surprises. Unleash your knowledge, test your skills, and brace yourself for a whirlwind of delightful experiences. </p>
         <p style={{ marginLeft:"70px",fontSize:"25px",marginTop:"30px" }}>Join us in this enchanting adventure, where every correct answer is a step closer to uncovering the mysteries of fantastic surprises that await you. It's not just a quiz, it's a gateway to a world filled with Khel (play) and Khushi (joy)!</p>
         </div>
        </div>
        {/* <div className="left-box">
          <h2>Left Box</h2>
          <p style={{ textAlign: "left" }}>Some text left side to the left box</p>
        </div> */}
    </div>
  );
};

export default Leaderboard;

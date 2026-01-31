import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';

import axios from "axios"
import Horizontal from './horizontal'



const Login = () => {
  const data = [  
    { 
      image: 'images/watchCricket.jpeg', 
      heading:'Epic Cricket Content: Unleash the Excitement!', 
      paragraph: ' Explore the thrill of cricket matches right on our website! Dive into live updates, match highlights, expert analyses, and exclusive interviews with your favorite cricket stars. Whether its the latest scores, captivating moments, or in-depth insights, our platform keeps you at the forefront of the cricketing world. From exhilarating boundary shots to nail-biting finishes, immerse yourself in the excitement of every match, right from the comfort of your screen.'
      
    
    },
    { 
      image: 'images/leaderboard.jpeg', 
      heading: 'Leaderboard Legends: Rise, Predict, Triumph!', 
      paragraph: 'Compete, climb the leaderboard, and seize the opportunity to win exciting prizes! Join our interactive challenges, predict match outcomes, and showcase your cricket knowledge. With each accurate prediction, earn points and rise through the ranks. Keep an eye on the leaderboard to see where you stand among fellow cricket enthusiasts. Plus, stand a chance to win exclusive merchandise, VIP tickets, and other incredible rewards. Dont miss out on the thrill – participate, predict, and win!.' 
    },
    { 
      image: 'images/stadium.jpeg', 
      heading: 'Tailored Thrills: Cricket Highlights Just for You!', 
      paragraph: 'Tailor your cricket experience with personalized highlights that match your preferences! Select your favorite teams, players, and match formats, and receive curated content that resonates with your interests. Whether its boundary blitzes from power hitters, masterful bowling spells, or game-changing moments, we deliver the highlights that matter most to you. Stay connected to the action that captivates you and enjoy a cricket experience uniquely crafted to suit your tastes.'

    },
  ];
  const history=useNavigate();
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function collectData(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:4000/",{
                email,password
            })
            .then(res=>{
                if(res.data==="exist"){
                  sessionStorage.setItem('userEmail', email); // Store email in session storage
                    history("/home",{state:{id:email}})
                }
                else if(res.data==="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }



  return (
    <>
    
    <div className="sign">
    <form onSubmit={collectData} className="form">
    <h2 className="h2">Log in</h2>
      <div className="container">
      
        <div className="email">
        <label htmlFor="exampleInputEmail1" className="form-label text-light">Email :</label>
        <input type="email" className="my-3 mx-3 email" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="password">
        <label htmlFor="exampleInputPassword1" className="form-label text-light">Password :</label>
        <input type="password" className="my-3 mx-3 password" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button type="submit" className="btn btn-primary" to="Home">Submit</button>
      </div>
    </form>
    </div>
    <br/>
    <Horizontal data={data}/>
    </>
  );
};

export default Login;

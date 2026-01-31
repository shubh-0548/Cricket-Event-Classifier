import React from "react";
import BG1 from '../img/BG1.jpg';
//import Homematch from "./Homematch";
import Horizontal from './horizontal'
import Navbar from './Navbar';
import './About.css'

const About = () => {
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
  return (
    <>
    <Navbar/>
    <div className="">
      
      <div>
        <img src={BG1} className="card-img-top ma" alt="..." style={{height:500}}/>
        {/* <Homematch/> */}
        <div className="card-body dev">
          <h3 className="card-title" style={{color:"black"}}>About the site : </h3>
          <div style={{color:"black" , width:1000 , marginLeft:200}} className="my-3 de" >
            <h5>
          <p className="card-text">
          At this site , we're passionate about cricket and the unforgettable moments that make the sport so special. We believe that every cricket fan deserves a personalized experience that captures the essence of the game in all its glory.
</p>
<p>
Our mission is simple: to provide cricket enthusiasts with tailor-made highlights that bring the excitement of the game to life. Whether you're cheering for your favorite team, following a thrilling match, or reliving iconic moments from cricket history, we're here to enhance your cricketing journey like never before.
</p>
<p>
What sets us apart is our commitment to customization. With our intuitive platform, you have the power to select the key moments that matter most to you, from breathtaking boundaries to game-changing wickets, and everything in between. Our goal is to empower you to curate highlights that reflect your passion for the game and celebrate the players and teams you love.
</p>
<p>
Led by a team of dedicated cricket fans and technology experts, we're driven by our shared love for the sport and our desire to deliver an unparalleled user experience. By leveraging cutting-edge technology and our deep understanding of cricket, we're able to bring you highlights that capture the essence of every match and evoke the thrill of being at the stadium.
</p>
<p>
Whether you're a die-hard cricket fan or just starting to explore the world of cricket, we invite you to join us on this journey. Together, let's celebrate the moments that define cricket and create memories that will last a lifetime.
          </p>
          </h5>
          </div>
        </div>
      </div>
      
      <Horizontal data={data}/>
    </div>
    </>
  );
};

export default About;

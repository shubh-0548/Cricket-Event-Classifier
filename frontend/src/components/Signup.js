// import React, { useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"
// import './Signup.css'
// import Horizontal from './horizontal'


// function Signup() {
//   const data = [
//     { 
//       image: 'images/watchCricket.jpeg', 
//       heading:'Epic Cricket Content: Unleash the Excitement!', 
//       paragraph: ' Explore the thrill of cricket matches right on our website! Dive into live updates, match highlights, expert analyses, and exclusive interviews with your favorite cricket stars. Whether its the latest scores, captivating moments, or in-depth insights, our platform keeps you at the forefront of the cricketing world. From exhilarating boundary shots to nail-biting finishes, immerse yourself in the excitement of every match, right from the comfort of your screen.'
      
    
//     },
//     { 
//       image: 'images/leaderboard.jpeg', 
//       heading: 'Leaderboard Legends: Rise, Predict, Triumph!', 
//       paragraph: 'Compete, climb the leaderboard, and seize the opportunity to win exciting prizes! Join our interactive challenges, predict match outcomes, and showcase your cricket knowledge. With each accurate prediction, earn points and rise through the ranks. Keep an eye on the leaderboard to see where you stand among fellow cricket enthusiasts. Plus, stand a chance to win exclusive merchandise, VIP tickets, and other incredible rewards. Dont miss out on the thrill – participate, predict, and win!.' 
//     },
//     { 
//       image: 'images/stadium.jpeg', 
//       heading: 'Tailored Thrills: Cricket Highlights Just for You!', 
//       paragraph: 'Tailor your cricket experience with personalized highlights that match your preferences! Select your favorite teams, players, and match formats, and receive curated content that resonates with your interests. Whether its boundary blitzes from power hitters, masterful bowling spells, or game-changing moments, we deliver the highlights that matter most to you. Stay connected to the action that captivates you and enjoy a cricket experience uniquely crafted to suit your tastes.'

//     },
//   ];
//     const history=useNavigate();

//     const [name,setName]=useState('')
//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')

//     async function submit(e){
//         e.preventDefault();

//         try{

//             await axios.post("http://localhost:4000/signup",{
//                name,email,password
//             })
//             .then(res=>{
//                 if(res.data==="exist"){
//                     alert("enter proper details")
//                 }
//                 else if(res.data==="notexist"){
//                     history("/Home",{state:{id:email,name}});
//                 }
//             })
//             .catch(e=>{
//               history("/Home",{state:{id:email}})
//                 console.log(e);
//             })

//         }
//         catch(e){
//             console.log(e);

//         }

//     }


//     return (
//         <div className="login">
           
//             <div className="sign">
//             <form action="POSt">
//             <h2 style={{color:"white" , justifyContent:'right'}} className="mx-5" >Sign up</h2>
//       <div className="container">
//         <div className="name">
//         <label htmlFor="exampleInputEmail1" className=" form-label text-light">Name :</label>
//         <input type="text" className="my-3 mx-3 " value={name} onChange={(e) => setName(e.target.value)} required/>
//         </div>
//         <div className="email">
//         <label htmlFor="exampleInputEmail1" className="form-label  text-light">Email :</label>
//         <input type="email" className="my-3 mx-3 email" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required/>
//         </div>
//         <div className="password">
//         <label htmlFor="exampleInputPassword1" className="form-label  text-light">Password :</label>
//         <input type="password" className="my-3 mx-3 password" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} required/>
//         </div>
//         <button type="submit" className="btn btn-primary  mx-3" to="Home" onClick={submit} >Submit</button>
//         <Link to="/Login"><button type="submit" className="btn btn-primary  mx-3" to="Home">Login Page</button></Link>
//       </div>
//     </form>
// </div>
           

            
//             <Horizontal data={data}/>
//         </div>
        
//     )
// }

// export default Signup


import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Signup.css'
import Horizontal from './horizontal'

function Signup() {
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

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
      e.preventDefault();
  
      try{
          await axios.post("http://localhost:4000/signup",{
              name,email,password
          })
          .then(res=>{
              if(res.data==="exist"){
                  alert("enter proper details")
              }
              else if(res.data==="notexist"){
                  sessionStorage.setItem('userEmail', email); // Store email in session storage
                  history("/Home",{state:{id:email,name}});
              }
          })
          .catch(e=>{
              history("/Home",{state:{id:email}})
              console.log(e);
          })
  
      }
      catch(e){
          console.log(e);
      }
  }
  

    return (
        <div className="login">
           
            <div className="sign">
            <form action="POSt">
            <h2 style={{color:"white" , justifyContent:'right'}} className="mx-5" >Sign up</h2>
      <div className="container">
        <div className="name">
        <label htmlFor="exampleInputEmail1" className=" form-label text-light">Name :</label>
        <input type="text" className="my-3 mx-3 " value={name} onChange={(e) => setName(e.target.value)} required/>
        </div>
        <div className="email">
        <label htmlFor="exampleInputEmail1" className="form-label  text-light">Email :</label>
        <input type="email" className="my-3 mx-3 email" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="password">
        <label htmlFor="exampleInputPassword1" className="form-label  text-light">Password :</label>
        <input type="password" className="my-3 mx-3 password" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button type="submit" className="btn btn-primary  mx-3" to="Home" onClick={submit} >Submit</button>
        <Link to="/Login"><button type="submit" className="btn btn-primary  mx-3" to="Home">Login Page</button></Link>
      </div>
    </form>
</div>
           

            
            <Horizontal data={data}/>
        </div>
        
    )
}

export default Signup

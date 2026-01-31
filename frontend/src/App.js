import './App.css';

import Highlight from './components/Highlight';
import Match from './components/Match';
import Vdo from './components/Vdo';
import Saved from './components/Saved' 
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';
import './components/Highlight.css'
import Mvdo from './components/Mvdo';
import Form from './components/Form';
import Signup from './components/Signup';

import{
  BrowserRouter as Router,
  Routes,
  Route
  }from 'react-router-dom';
import Leaderboard from './components/Leaderboard';

function App() {
  
  return (
    <>
      <Router>
      
        <Routes>
          <Route path="/Highlight" element={<Highlight/>}/>
          <Route path="/Match" element={<Match/>}/>
          <Route path="/Leaderboard" element={<Leaderboard/>}/>
          <Route path="/Home" element={<Home/>}/>

          <Route path="/Mvdo/AUvsIN" element={<Mvdo vd1="AUvsIN"/>}/>
          <Route path="/Mvdo/AUvsPK" element={<Mvdo vd1="AUvsPK"/>}/>
          <Route path="/Mvdo/AUvsWI" element={<Mvdo vd1="AUvsWI"/>}/>
          <Route path="/Mvdo/INvsPK" element={<Mvdo vd1="INvsPK"/>}/>
          <Route path="/Mvdo/INvsSA" element={<Mvdo vd1="INvsSA"/>}/>

          <Route path="/Login" element={<Login/>}/>
          <Route path="/" element={<Signup/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Form" element={<Form/>}/>
          <Route path="/Vdo" element={<Vdo vd="AUvsIN"/>}/> 
         </Routes>
      </Router>
    
      <Footer/>
    </>
  );
}

export default App;

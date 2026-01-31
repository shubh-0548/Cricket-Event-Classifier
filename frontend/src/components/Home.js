import React from 'react'
import About from './About'
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
    const { id, name } = location.state || {};

  return (
    
    <div>
      <About/>
      <div>
            {/* <h1>Welcome to Home</h1>
            {id && <p>Email: {id}</p>}
            {name && <p>Name: {name}</p>} */}
        </div>
    </div>
  )
}

export default Home

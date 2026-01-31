import React , {useEffect } from 'react'
import './Highlight.css'
import './Mvdo.css'
import Navbar from './Navbar';
import SupporeMvdo from './SupporeMvdo';
import Quiz from './quiz'
const Mvdo = (props) => {
  // useEffect(() => {
  //   // Send vd1 to the backend
  //   fetch(`/predictions?vd1=${props.vd1}`, {
  //     method: 'GET',
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch predictions');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching predictions:', error);
  //     });
  // }, [props.vd1]); // Run effect whenever vd1 changes

  return (
    <>
    <Navbar/>
    <div style={{display:"flex",backgroundColor:"black"}} className='aa'>
      <div>
             <div style={{backgroundColor:'black'} }className='mvdo'>
                   <video width="700" height="550" controls autoPlay={"autoplay"}>
                   <source src={require(`../highlights/${props.vd1}.mp4`)} type="video/mp4" />
                   </video>
             </div>
             </div>
             <SupporeMvdo vdo={props.vd1}/>
      <div>
      
      </div>
     
 </div>
<Quiz/>
</>
  )
}

export default Mvdo


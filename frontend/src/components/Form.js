import React  from 'react'
import './Form.css';

const Form = () => {
  return (
    <>
    <div className='box'>
        <form className='frm'>
            <div className='one'>
            <div  className=''>
                <label htmlFor="label1" className='lb'>inning 1:</label>
                <input
                    type="checkbox"
                    id="box1"
                    name="box1"
                    className='in'
                   
                />
                <label htmlFor="box1" className='lb'>wickets</label>
                <input
                    type="checkbox"
                    id="box2"
                    name="box2"
                    className='in'
                />
                <label htmlFor="box2" className='lb'>fours</label>
                <input
                    type="checkbox"
                    id="box3"
                    name="box3"
                    className='in'
                />
                <label htmlFor="box3" className='lb'>sixes</label><br/><br/>
            </div>

            <div  className='two'>
                <label htmlFor="label2" className='lb'>inning 2:</label><br/>
                <input
                    type="checkbox"
                    id="box4"
                    name="box4"
                    className='in'
                />
                <label htmlFor="box4" className='lb'>wickets</label><br/>
                <input
                    type="checkbox"
                    id="box5"
                    name="box5"
                    className='in'
                />
                <label htmlFor="box5"  className='lb'>fours</label><br/>
                <input
                    type="checkbox"
                    id="box6"
                    name="box6"
                    className='in'
                />
                <label htmlFor="box6">sixes</label><br/><br/>
            </div>
            </div>
            <input type="submit" value="Submit" />
        </form>
    </div>
    </>
  )
}

export default Form

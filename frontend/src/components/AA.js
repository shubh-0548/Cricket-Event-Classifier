import React, { useState } from 'react';

function AA() {
    const [outputData, setOutputData] = useState('');
    const processVideo = async () => {
        const response = await fetch('http://localhost:4000/stream-video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = await response.json();
        setOutputData(data.outputData);
      };
    
  return (
    <div>
      <button onClick={processVideo}>Process Video</button>
      <>Output Data: {outputData}</>
    </div>
  )
}

export default AA

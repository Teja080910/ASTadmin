import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import "./Controls.css";


const SOCKET_SERVER_URL = "http://localhost:5000"; 
const socket = socketIOClient(SOCKET_SERVER_URL);

const Controls = () => {
  const imageMappings = [
    { code: '000', },
    { code: '001', path: '../head.png' },
    { code: '002', path: '../clock.png' },
    // Add more mappings as needed
  ];

  const [leftImage, setLeftImage] = useState(imageMappings[0]?.code || '');
  const [rightImage, setRightImage] = useState(imageMappings[0]?.code || '');

  useEffect(() => {
    // Emit initial state
    socket.emit('changeSide', { code: leftImage, side: 'left' });
    socket.emit('changeSide', { code: rightImage, side: 'right' });
  }, []);

  const handleSelectChange = (event, side) => {
    const code = event.target.value;
    if (side === 'left') {
      setLeftImage(code);
      socket.emit('changeSide', { code, side });
    } else if (side === 'right') {
      setRightImage(code);
      socket.emit('changeSide', { code, side });
    }
  };

  return (
    <div className="controls">
      <div className="image-mappings">
        <h3>Activity Image </h3>
        <div>

      
        {imageMappings?.map((image) => (
          image.path &&
          <div key={image.code} className="image-mapping">
            <img src={image.path} alt={`activity  ${image.code}`} className="mapping-img" />
            <p>{`Code: ${image.code}`}</p>
          </div>

        ))}
          </div>
      </div>
      <div className="control-item">
        <h3>Left Side</h3>
        <select value={leftImage} onChange={(e) => handleSelectChange(e, 'left')}>
          {imageMappings.map((image) => (
            <option key={image.code} value={image.code}>
              {image.code}
            </option>
          ))}
        </select>
      </div>
      <div className="control-item">
        <h3>Right Side</h3>
        <select value={rightImage} onChange={(e) => handleSelectChange(e, 'right')}>
          {imageMappings.map((image) => (
            <option key={image.code} value={image.code}>
              {image.code}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Controls;

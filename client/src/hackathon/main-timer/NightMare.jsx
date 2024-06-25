// src/components/Nightmare.js
import React from 'react';
import './countdown/NightMare.css';

const Nightmare = () => {
  return (
    <div className="nightmare">
      <img src="../../../static/street-lights.png" className="streetlights"/>
      <img src="../../../static/nightmare.png" alt="Buildings" className="buildings" />
      <div className="streetlight streetlight1"></div>
      <div className="streetlight streetlight2"></div>
      <div className="streetlight streetlight3"></div>
    </div>
  );
};

export default Nightmare;

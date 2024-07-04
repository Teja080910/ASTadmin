import React from 'react';
import './countdown/SunnyScene.css'; // Assuming you have a CSS file for styling

const SunnyScene = () => {
  return (
    <div className="background-container">
      <div className="front">
        <span className="ground"></span>
      </div>
    
      <div className="middle">
        <div className="tree one">
          <span className="top"></span>
          <span className="overlap"></span>
          <span className="trunk"></span>
        </div>
        <div className="tree two">
          <span className="top"></span>
          <span className="overlap"></span>
          <span className="trunk"></span>
        </div>
        <div className="tree three">
          <span className="top"></span>
          <span className="overlap"></span>
          <span className="trunk"></span>
        </div>
      </div>
    
      <div className="back">
        <span className="hill one"></span>
        <span className="hill two"></span>
        <span className="hill three"></span>
        <span className="hill four"></span>
        
        <span className="sun-rays"></span>
        <span className="sun"></span>
        <div className="cloud one">
          <span className="cloud-body"></span>
          <span className="cloud-top"></span>
          <span className="cloud-puff"></span>
        </div>
        <div className="cloud two">
          <span className="cloud-body"></span>
          <span className="cloud-top"></span>
          <span className="cloud-puff"></span>
        </div>
      </div>
      
      <div className="person">
        <div className="head"></div>
        <div className="coat"></div>
        <div className="legs"></div>
        <div className="arm"></div>
        <div className="string"></div>
        <div className="balloon"></div>
      </div>
    </div>
  );
};

export default SunnyScene;

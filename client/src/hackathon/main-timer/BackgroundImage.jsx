// src/components/BackgroundImage.js
import React from 'react';
import './countdown/BackgroundImage.css';

const BackgroundImage = ({ background }) => {
  return (
    <div className="background-image" style={{ backgroundImage: `url(${background})` }}>
    </div>
  );
};

export default BackgroundImage;

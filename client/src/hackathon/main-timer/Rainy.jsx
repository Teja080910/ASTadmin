// src/components/Rainy.js
import React from 'react';
import './countdown/Rainy.css';

const Rainy = () => {
  return (
    <div className="rainy">
      <img src="../../../static/day-with-rain.webp" alt="Cloud" className="cloud" />
      <img src="../../../static/dark-cloud.png" alt="Cloud" className="dark-cloud" />

      <div className="raindrops">
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
      </div>
    </div>
  );
};

export default Rainy;

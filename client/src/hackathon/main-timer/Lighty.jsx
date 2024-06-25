// src/components/Sunny.js
import React from "react";
import "./countdown/Sunny.css";

const Sunny = () => {
  return (
    <div className="sunny">
      <div className="move-sun">
        <img
          src="../../../static/clear-day.png"
          alt="Sun"
          className="rot-sun"
        />
      </div>
      <img
        src="../../../static/smoke.png"
        alt="Cloud 1"
        className="cloud cloud1"
      />
      <img
        src="../../../static/smoke.png"
        alt="Cloud 2"
        className="cloud cloud2"
      />
    </div>
  );
};

export default Sunny;

// src/components/TimeBasedComponent.js
import React, { useEffect, useState } from 'react';
import SunnyScene from './Sunny';
import Night from './Night';
import DayToNight from './DayToNight';
import Sleep from './Sleep';
import Rainy from './Rainy';
import Nightmare from './NightMare';
import MorningYoga from './MorningYoga';

import Sunny from './Lighty';
import BackgroundImage from './BackgroundImage';
import { backgrounds } from '../resources';

const TimeBasedComponent = ({ timeLeft, socket }) => {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    // Fetch the initial background
    socket.emit("getBackground");

    // Listen for background updates
    socket.on("background", (data) => {
      setBackground(data.code);
    });

    socket.on("backgroundData", (data) => {
      setBackground(data.code);
    });

    // Cleanup the socket listeners on component unmount
    return () => {
      socket.off("background");
      socket.off("backgroundData");
    };
  }, [socket]);

  const { hours } = timeLeft;

  const renderComponentBasedOnTime = () => {
    if (hours > 14) {
      return <SunnyScene />;
    } else if (hours > 12 && hours <= 14) {
      return <DayToNight />;
    } else if (hours > 5 && hours <= 12) {
      return <Night />;
    } else if (hours > 2 && hours <= 5) {
      return <Sleep />;
    } else {
      return <div></div>;
    }
  };

  const renderComponentBasedOnBackground = () => {
    if (background.startsWith('img-')) {
      const bg = backgrounds.find((bg) => bg.code === background);
      return <BackgroundImage background={bg.path} />;
    }

    switch (background) {
      case 'bg-000':
        return renderComponentBasedOnTime();
      case 'bg-001':
        return <Sunny />;
      case 'bg-002':
        return <Rainy />;
      case 'bg-003':
        return <Sleep />;
      case 'bg-004':
        return <Nightmare />;
      case 'bg-005':
        return <DayToNight />;
      case 'bg-006':
        return <MorningYoga />;
      case 'bg-007':
        return <SunnyScene />;
      default:
        return renderComponentBasedOnTime();
    }
  };

  return (
    <>
      {background ? renderComponentBasedOnBackground() : renderComponentBasedOnTime()}
    </>
  );
};

export default TimeBasedComponent;

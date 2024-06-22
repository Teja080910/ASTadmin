import React from 'react';
import SunnyScene from './Sunny';
import Night from './Night';
import DayToNight from './DayToNight';
import Sleep from './Sleep';

const TimeBasedComponent = ({ timeLeft }) => {
  const { hours } = timeLeft;

  if (hours > 14) {
    return <SunnyScene />;
  } else if (hours > 12 && hours <= 14) {
    return <DayToNight/>;
  } else if (hours > 5 && hours <= 12) {
    return <Night/>;
  } else if (hours > 2 && hours <= 5) {
    return <Sleep/>;
  } else {
    return <div></div>; 
  }
};

export default TimeBasedComponent;

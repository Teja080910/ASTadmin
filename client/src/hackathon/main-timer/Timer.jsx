import { useEffect, useState } from "react";
import "./countdown/countdown.css";
import axios from "axios";
import TimeBasedComponent from "./TimeBasedComponent";
import Activities from "./Activitys";

const Timer = ({ url = "https://timer-server-edko.onrender.com" }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [endTime, setEndTime] = useState(null);

  const getTimeLeft = (endTime) => {
    const total = endTime - Date.now();
  
    if (total <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
  
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);
  
    return { hours, minutes, seconds };
  };
  
  const getHackTime = async (url) => {
    const storedTime = localStorage.getItem("HackTime");
    if (storedTime) {
      setEndTime(new Date(storedTime));
    } else {
      try {
        const response = await axios.get(`${url}/api/timer`);
        if (response.data) {
          const hackathonTimer = response.data.timers.find(
            (timer) => timer.title === "hackathon"
          );
          const hackathonEndTime = new Date(hackathonTimer.endTime);
          setEndTime(hackathonEndTime);
          localStorage.setItem("HackTime", hackathonEndTime);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getHackTime(url);
  }, [url]);

  useEffect(() => {
    if (endTime) {
      const timer = setInterval(() => {
        setTimeLeft(getTimeLeft(endTime));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [endTime]);

  return (
    <div className="countdown">
      <div className="background-attach">
        <TimeBasedComponent timeLeft={timeLeft} />
      </div>
      <div className="main-activity">
        <Activities />
      </div>

      <div className="hack-title">
        <h1 className="h1-animation">VEDIC VISION HACKATHON</h1>
      </div>
      <div className="count-icon">
        <h2 style={{ textAlign: "center" }}>Ends in</h2>
      </div>

      <div className="content">
        {timeLeft && (
          <>
            <div className="box">
              <div className="value hours">{timeLeft.hours}</div>
              <div className="label">Hours</div>
            </div>
            <div className="box">
              <div className="value minutes">{timeLeft.minutes}</div>
              <div className="label">Minutes</div>
            </div>
            <div className="box">
              <div className="value seconds">{timeLeft.seconds}</div>
              <div className="label">Seconds</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;

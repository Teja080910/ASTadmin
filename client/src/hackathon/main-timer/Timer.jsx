import { useEffect, useState } from "react";
import "./countdown/countdown.css";
import axios from "axios";
import TimeBasedComponent from "./TimeBasedComponent";
import Activities from "./Activitys";
import { Box, Button } from "@chakra-ui/react";
import Scorer from "./Scorer";

const Timer = ({ url = "https://timer-server-edko.onrender.com", socket }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });
  const [endTime, setEndTime] = useState(null);
  const [gamedata, setGameData] = useState(false);
  const [pageState, setPageState] = useState("timer")

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
    }

    try {
      const response = await axios.get(`${url}/api/timer`);
      if (response.data.timers) {
        const hackathonTimer = response.data?.timers?.find(
          (timer) => timer.title === "hackathon"
        );

        if (hackathonTimer) {
          const hackathonEndTime = new Date(hackathonTimer.endTime);

          if (storedTime !== hackathonEndTime.toString()) {
            setEndTime(hackathonEndTime);
            localStorage.setItem("HackTime", hackathonEndTime.toString());
          }
        } else {
          setEndTime(new Date(0)); 
          localStorage.setItem("HackTime", new Date(0).toString());
        }
      } else {
        setEndTime(new Date()); 
        localStorage.setItem("HackTime", new Date(0).toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHackTime(url);
  }, [url]);
  useEffect(() => {
    socket.emit("gameData");

    socket.on("gameData", (data) => {
      if (data?.code === "000" ) {
        setGameData(null);
      } else {
        setGameData(data?.code);
      }
    });
  }, []);

  useEffect(() => {
    if (endTime) {
      const timer = setInterval(() => {
        setTimeLeft(getTimeLeft(endTime));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [endTime]);

  console.log(pageState)
  return (
    <div className="countdown">
      <div className="background-attach">
        <TimeBasedComponent timeLeft={timeLeft} socket={socket} />
      </div>
      <div className="main-activity">
        <Activities socket={socket} setStateUpdate={setPageState}/>
      </div>

      <div className="hack-title">
        <h1 className="h1-animation">VEDIC VISION HACKATHON</h1>
      </div>
      {gamedata && <Scorer socket={socket} />}

    { pageState ==="timer" && !gamedata && <Box >

    
      <div className="count-icon" style={{ textAlign: "center" }}>
        {timeLeft.hours < 1 ? (
          <Button
            size="lg"
            className="h1-animation"
            variant="outline"
            height="48px"
            width="200px"
            onClick={() => window.location.reload()}
          >
            Start
          </Button>
        ) : (
          <h2 style={{ textAlign: "center" }}>Ends in</h2>
        )}
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
      </Box>}
    </div>
  );
};

export default Timer;

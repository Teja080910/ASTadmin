import { useEffect, useState } from "react";
import "./countdown/countdown.css";
import axios from "axios";
import TimeBasedComponent from "./TimeBasedComponent";
import Activities from "./Activitys";
import { Box, Button } from "@chakra-ui/react";
import Scorer from "./Scorer";
import Confetti from "react-confetti";

const Timer = ({ url = "https://timer-server-edko.onrender.com", socket }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  const [endTime, setEndTime] = useState(null);
  const [gamedata, setGameData] = useState(false);
  const [pageState, setPageState] = useState("timer");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [start, setStart] = useState(false);

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
          setStart(true)
          }
        } else {
          setStart(false);
          localStorage.setItem("HackTime", new Date(0).toString());
        }
      } else {
        setStart(false);
        localStorage.setItem("HackTime", new Date(0).toString());
      }
    } catch (error) {
      setStart(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getHackTime(url);
  }, [url]);

  useEffect(() => {
    socket.emit("gameData");

    socket.on("gameData", (data) => {
      if (data?.code === "000") {
        setGameData(null);
      } else {
        setGameData(data?.code);
      }
    });
  }, []);

  useEffect(() => {
    const endDate = new Date(endTime); 
    const now = new Date(); 
  
  
  
    if (endDate > now) {
      const timer = setInterval(() => {
        setTimeLeft(getTimeLeft(endTime));
      }, 1000);
  
    
  
      return () => clearInterval(timer); // Cleanup the timer
    } else {
      setTimeLeft({
        hours: 24,
        minutes: 0,
        seconds: 0,
      });
    }
  }, [endTime]);
  

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);

      setInnerHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStartClick = () => {
    getHackTime(url)
    setTimeout(() => {
      setStart(false);
    }, 30000); // 30 seconds
  };

  return (
    <div className="countdown">
      {timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds <= 3 &&
       <Confetti width={innerWidth - 10} height={innerHeight} />}
      {timeLeft.hours === 23 &&
        timeLeft.minutes >=58 &&
        timeLeft.seconds >= 0 && start && <Confetti width={innerWidth - 10} height={innerHeight} />}
      <div className="background-attach">
        <TimeBasedComponent timeLeft={timeLeft} socket={socket} />
      </div>
      <div className="main-activity">
        <Activities socket={socket} setStateUpdate={setPageState} />
      </div>

      <div className="scalable">
        <h1 className="h1-animation">VEDIC VISION HACKATHON</h1>

        {pageState === "timer" && (
          <Box className="logos" position={"relative"} height={"120px"}>
            <Box display={"flex"} justifyContent={"center"} gap={10}>
              <img src="../eoclogo.png" style={{ transform: "scale(1.19)" }} />
              <img
                src="../icsvbsc.jpg"
                style={{ transform: "scale(1.1)", borderRadius: "10px" }}
              />
              <img src="../ast-no-bg.png" style={{ transform: "scale(1.5)" }} />
              <img
                src="../logo-ieee.png"
                style={{ transform: "scale(1.2)", borderRadius: "10px" }}
              />
              <img src="../paie-logo.jpg" style={{ borderRadius: "50%" }} />
            </Box>

            <Box
              position="relative"
              display={"flex"}
              top={"-225px"}
              justifyContent="space-between"
              padding={50}
            >
              <img
                src="../srkr-logo.png"
                style={{
                  borderRadius: "20px",
                  objectFit: "contain",
                  width: "150px",
                  height: "200px",
                }}
              />
              <img
                src="../vbsieee.jpg"
                style={{
                  borderRadius: "10px",
                  objectFit: "contain",
                  width: "150px",
                  height: "200px",
                }}
              />
            </Box>
          </Box>
        )}
      </div>
      {gamedata && <Scorer socket={socket} />}

      {pageState === "timer" && !gamedata && (
        <Box>
          <div className="count-icon" style={{ textAlign: "center" }}>
            {timeLeft.hours ===24 ? (
              <Button
                size="lg"
                className="h1-animation"
                variant="outline"
                height="48px"
                width="200px"
                onClick={handleStartClick}
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
        </Box>
      )}
    </div>
  );
};

export default Timer;

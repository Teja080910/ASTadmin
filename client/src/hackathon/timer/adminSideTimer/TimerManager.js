import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./TimerManager.css";
import { useToast } from '@chakra-ui/react';
import Controls from '../hackathonTimer/Controls';

const TimeManager = ({ URL = "https://timer-server-edko.onrender.com" }) => {
  const [timers, setTimers] = useState([]);
  const [timerTitle, setTimerTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [color, setColor] = useState(false);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const sendAlert = async () => {
    const result = await axios.post(`${URL}/api/notify`, {
      notification: alert,
    });
    toast({
      title: result.data.message,
      status: "success",
      position: "top",
      isClosable: false,
    });
    if (result.data === " ") {
      setAlert("");
    }
  };

  useEffect(() => {
    const fetchTimers = async () => {
      try {
        const response = await axios.get(`${URL}/api/timer`);
        if (response.data.timers) {
          setTimers(response.data.timers);
        }
      } catch (error) {
        toast({
          title: "There was an error fetching the timers!",
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    };

    fetchTimers();
  }, []);

  const setEventTime = async () => {
    setLoading(true);

    if (!timerTitle || !duration) {
      toast({
        title: "Please enter both duration and title",
        status: "warning",
        position: "top",
        isClosable: true,
      });

      setLoading(false);
      return;
    }

    const now = new Date();
    const [hours, minutes] = duration.split(":").map(Number);
    const endTime = new Date(
      now.getTime() + hours * 3600 * 1000 + minutes * 60 * 1000
    );
    const newEndTimeISOString = endTime.toISOString();

    try {
      const response = await axios.post(`${URL}/api/timer`, {
        title: timerTitle,
        endTime: newEndTimeISOString,
        timerColor: color,
      });
      setTimers([...timers, response.data.timer]);
      setTimerTitle("");
      setDuration("");
      if (response.data.message === "Timer created") {
        toast({
          title: response.data.message,
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        position: "top",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTimer = async (timerId) => {
    try {
      const response = await axios.post(`${URL}/api/deletetimer`, {
        id: timerId,
      });
      if (response.data.message === "Timer deleted successfully") {
        setTimers((timers) => timers.filter((timer) => timer.id !== timerId));
        toast({
          title: "Timer deleted successfully",
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "There was an error deleting the timer!",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <div className="timer-container">
     
    <div className="timer-container-main">
      <div>
        <h1>Alerts</h1>
        <input
          type="text"
          value={alert}
          onChange={(e) => {
            setAlert(e.target.value);
          }}
        />
        <button onClick={sendAlert}>Send</button>
      </div>
      <hr/>
      
      <div>
      <h1>Manage Timers</h1>
        <label>Duration (hh:mm): </label>
        <input
          type="time"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <label>Title: </label>
        <input
          type="text"
          value={timerTitle}
          onChange={(e) => setTimerTitle(e.target.value)}
          required
        />
        <label>color: </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
        <button onClick={setEventTime}>Add Timer</button>
      </div>
      <div className="timers">
        <h2>Existing Timers</h2>
        <ul>
          {timers.length>0 ? timers.map((timer) => (
            <li key={timer.id}>
              <div>
              <p>{timer.title} - {new Date(timer.endTime).toLocaleString()}</p>

              </div>
              <div>
              <button onClick={() => deleteTimer(timer.id)}><DeleteForeverIcon/></button>

              </div>
            </li>
          )) : <li > no timers found</li>}
        </ul>
      </div>
      
    </div>
    <div className='timer-block'>
        <Controls />
      </div>
    </div>
  );
};

export default TimeManager;

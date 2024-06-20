import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TimerManager.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TimeManager = ({ URL = "https://timer-server-edko.onrender.com" }) => {
  const [timers, setTimers] = useState([]);
  const [timerTitle, setTimerTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [color, setColor] = useState(false);
  const [alert, setAlert] = useState("");

  const sendAlert = async () => {
    URL = "http://localhost:5000";
    const result = await axios.post(`${URL}/api/notify`, {
      notification: alert,
    });
    console.log(result);
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
        console.error("There was an error fetching the timers!", error);
      }
    };

    fetchTimers();
  }, [URL]);

  const setEventTime = async () => {
    if (!timerTitle || !duration) {
      alert("Please enter both duration and title");
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
    } catch (error) {
      alert(error.message);
      console.log("There was an error creating the timer!", error);
    }
  };

  const deleteTimer = async (timerId) => {
    console.log("Deleting timer " + timerId);
    try {
      const response = await axios.post(`${URL}/api/deletetimer`, {
        id: timerId,
      });
      if (response.data.message === "Timer deleted successfully") {
        setTimers((timers) => timers.filter((timer) => timer.id !== timerId));
      }
    } catch (error) {
      console.error("There was an error deleting the timer!", error);
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
    </div>
  );
};

export default TimeManager;

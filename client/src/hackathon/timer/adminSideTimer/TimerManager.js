import { Button, Text, useToast } from '@chakra-ui/react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Controls from '../hackathonTimer/Controls';
import { StartAndStop } from './start&stop';
import "./TimerManager.css";

const TimeManager = ({ URL = "https://timer-server-edko.onrender.com", socket }) => {
  const [timers, setTimers] = useState([]);
  const [timer,setTimer]=useState()
  const [timerTitle, setTimerTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [color, setColor] = useState("#435666");
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
  console.log(timer)
  return (
    <div className="timer-container">
      <StartAndStop timer={value=>setTimer(value)}/>
      <div className="timer-container-main">
        <div>
          <Text fontSize='3xl' noOfLines={1}>Alerts to Students</Text>
          <input
            type="text"
            value={alert}
            onChange={(e) => {
              setAlert(e.target.value);
            }}
          />
          <Button onClick={sendAlert}>Send</Button>
        </div>
        <hr />

        <div>
          <Text fontSize='3xl' noOfLines={1}>Manage Timers</Text>
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
          <Button onClick={setEventTime}>Add Timer</Button>
        </div>

        <div className="timers">
          <Text fontSize='3xl' noOfLines={1}>Existing Timers</Text>
          <ul>
            {timers.length > 0 ? timers.map((timer) => (
              <li key={timer.id}>
                <div>
                  <p>{timer.title} - {new Date(timer.endTime).toLocaleString()}</p>

                </div>
                <div>
                  <Button onClick={() => deleteTimer(timer.id)}><DeleteForeverIcon /></Button>

                </div>
              </li>
            )) : <li > no timers found</li>}
          </ul>
        </div>

      </div>
      <div className='timer-block'>
        <Controls socket={socket} />
      </div>
    </div>
  );
};

export default TimeManager;

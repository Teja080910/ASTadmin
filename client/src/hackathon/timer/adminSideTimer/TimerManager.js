import { Box, Button, Text, useToast } from '@chakra-ui/react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Controls from '../hackathonTimer/Controls';
import { StartAndStop } from './start&stop';
import "./TimerManager.css";

const TimeManager = ({ URL = "https://timer-server-edko.onrender.com", socket }) => {
  const [timers, setTimers] = useState([]);
  const [timer, setTimer] = useState();
  const [timerTitle, setTimerTitle] = useState("hackathon");
  const [duration, setDuration] = useState("23:59");
  const [color, setColor] = useState("#FF0000");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const sendAlert = async () => {
    const result = await axios.post(`${URL}/api/notify`, { notification: alert });
    toast({ title: result.data.message, status: "success", position: "top", isClosable: false });
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
        toast({ title: "There was an error fetching the timers!", status: "error", position: "top", isClosable: true });
      }
    };

    fetchTimers();
  }, []);

  const setEventTime = async () => {
    setLoading(true);

    if (!timerTitle || !duration) {
      toast({ title: "Please enter both duration and title", status: "warning", position: "top", isClosable: true });
      setLoading(false);
      return;
    }

    const now = new Date();
    const [hours, minutes] = duration.split(":").map(Number);
    const endTime = new Date(now.getTime() + hours * 3600 * 1000 + minutes * 60 * 1000);
    const newEndTimeISOString = endTime.toISOString();

    try {
      const response = await axios.post(`${URL}/api/timer`, {
        title: timerTitle,
        endTime: newEndTimeISOString,
        timerColor: color,
      });
      setTimerTitle("");
      setDuration("");
      if (response.data.message === "Timer created") {
        toast({ title: response.data.message, status: "success", position: "top", isClosable: true });
        setTimers([...timers, response.data.timer]);

      }else {
        toast({ title: response.data.message, status: "error", position: "top-right", isClosable: true });

      }
    } catch (error) {
      toast({ title: error.message, status: "error", position: "top", isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  const deleteTimer = async (id) => {
    try {
      const response = await axios.post(`${URL}/api/deletetimer`, { id: id });
      if (response.data.message === "Timer deleted successfully") {
        setTimers((timers) => timers.filter((timer) => timer.id !== id));
        console.log(timer, timerTitle);
        toast({ title: "Timer deleted successfully", status: "success", position: "top", isClosable: true });
      }
    } catch (error) {
      toast({ title: "There was an error deleting the timer!", status: "error", position: "top", isClosable: true });
    }
  };

  return (
    <Box className="timer-container" >

      <div className="timer-container-main">
        <div>
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='3' margin={1}>
            <StartAndStop
              timer={value => setTimer(value)}
              setEventTime={setEventTime}
              deleteTimer={deleteTimer}
              timers={timers}
              start={() => console.log("Timer started")}
              stop={() => console.log("Timer stopped")}
              setTimerTitle={setTimerTitle}
            />
          </Box>

          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='3' m="1">

            <Text fontSize='3xl' noOfLines={1}>Alerts to Students</Text>
            <input
              type="text"
              value={alert}
              onChange={(e) => { setAlert(e.target.value); }}
            />
            <Button backgroundColor="gray.500" onClick={sendAlert}>Send</Button>
          </Box>


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
          <Button backgroundColor="teal.500" onClick={setEventTime}>Add Timer</Button>
        </div>
        <div className="timers">
          <Text fontSize='3xl' noOfLines={1}>Existing Timers</Text>
          <ul>
            {timers.length > 0 ? timers?.map((timer) => (
              <li key={timer?.id}>
                <div>
                  <p>{timer?.title} - {new Date(timer?.endTime).toLocaleString()}</p>
                </div>
                <div>
                  <Button onClick={() => deleteTimer(timer?.id)}><DeleteForeverIcon /></Button>
                </div>
              </li>
            )) : <li>no timers found</li>}
          </ul>
        </div>
      </div>
      <div className='timer-block'>
        <Controls socket={socket} />
      </div>
    </Box>
  );
};

export default TimeManager;

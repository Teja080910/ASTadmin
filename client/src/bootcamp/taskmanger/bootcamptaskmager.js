import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './bootcamptasks.css';
import { Button } from 'react-bootstrap';
import { TaskInput } from './taskinput';
const BootcampTasks = () => {
    
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_database + '/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);
    return (
        <div>
        <TaskInput tasks={tasks} setTasks={setTasks}/>
        
        </div>
    );
};
export default BootcampTasks;
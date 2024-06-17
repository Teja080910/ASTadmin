import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './bootcamptasks.css';
import { TaskInput } from './taskinput';

const BootcampTasks = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetchTasks();
    }, []);
    const fetchTasks = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_database + '/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    const reloadTasks = () => {
        fetchTasks();
    };
    return (
        <div>
            <TaskInput tasks={tasks} reload={reloadTasks} />
        </div>
    );
};
export default BootcampTasks;

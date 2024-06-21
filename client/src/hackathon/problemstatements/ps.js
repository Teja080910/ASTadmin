import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PSInput } from './problemstatement';
import './ps.css';


const PSS = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetchTasks();
    }, []);
    const fetchTasks = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_database + '/statements');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    const reloadTasks = () => {
        fetchTasks();
    };
    return (
        <div className='task-manager'>
            <PSInput tasks={tasks} reload={reloadTasks} />
        </div>
    );
};
export default PSS;

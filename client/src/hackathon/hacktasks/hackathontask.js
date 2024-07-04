import React, { useEffect, useState } from 'react';
import { Actions } from '../../actions/actions';
import './hackathontasks.css';
import { RoundInput } from './roundinput';

const HackathonTasks = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetchTasks();
    }, []);
    const fetchTasks = async () => {
        await Actions.TeamsCodes()
            .then((res) => {
                setTasks(res?.data)
            }).catch((e) => console.log(e))
    };
    const reloadTasks = () => {
        fetchTasks();
    };
    return (
        <div className='task-manager'>
            <RoundInput tasks={tasks} reload={reloadTasks} />
        </div>
    );
};
export default HackathonTasks;

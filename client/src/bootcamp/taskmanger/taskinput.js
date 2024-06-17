import { Button, Input, Stack, Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './bootcamptasks.css';

export const TaskInput = () => {
    const [day, setDay] = useState('');
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleDayChange = (e) => setDay(e.target.value);
    const handleTaskChange = (e) => setTask(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_database + '/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async () => {
        try {
            const newTask = { day, task, description };
            const response = await axios.post(process.env.REACT_APP_database + '/tasks', newTask);
            setDay('');
            setTask('');
            setDescription('');
            fetchTasks();
        } catch (error) {
            console.error('Error adding new task:', error);
        }
    };

    return (
        <div className="task-form">
            <Stack spacing={4}>
                <Input
                    placeholder="Enter day"
                    value={day}
                    onChange={handleDayChange}
                    size="lg"
                />
                <Input
                    placeholder="Enter task"
                    value={task}
                    onChange={handleTaskChange}
                    size="lg"
                />
                <Input
                    placeholder="Enter description"
                    value={description}
                    onChange={handleDescriptionChange}
                    size="lg"
                />
                <Button colorScheme="cyan" onClick={handleSubmit}>Add Task</Button>
            </Stack>
            <Box mt={8}>
            <div className=''>
            <h1 className='h1-tasks'>Tasks in Bootcamp</h1>
                {tasks.map((task, index) => (
                    <Box key={index} className='task-item'p={4} borderWidth={1} borderRadius="lg" mb={4}>
                        <Text fontWeight="bold">Day: {task.day}</Text>
                        <Text className='task-title'>Task: {task.task}</Text>
                        <Text className='task-description'>Description: {task.description}</Text>
                        <div className='task-select'>
                            <Button>Delete</Button>
                            <Button>Edit</Button>
                            <Button>Show</Button>


                        </div>
                    </Box>
                ))}
                </div>
            </Box>
        </div>
    );
};



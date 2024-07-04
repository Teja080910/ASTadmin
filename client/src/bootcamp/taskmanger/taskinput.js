import { Box, Button, Input, Stack, Text, useToast, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import './bootcamptasks.css';

export const TaskInput = ({ tasks, reload }) => {
    const [day, setDay] = useState('');
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [marks, setMarks] = useState('');
    const [indexs, setIndexes] = useState();
    const [update, setUpdate] = useState(false);
    const [load, setLoad] = useState(false);
    const toast = useToast();
    const formRef = useRef(null);

    const handleSubmit = async () => {
        if(day&&task&&description&&marks){
            setLoad(true);
        try {
            const response = await axios.post(process.env.REACT_APP_database + '/inserttask', { day, task, description, marks });
            if (response.data) {
                reload();
                setLoad(false);
                toast({ title: "Insert successfully", status: "success", position: "top-right", isClosable: true });
                setDay('');
                setTask('');
                setDescription('');
                setMarks('');
                setUpdate(false);
            }
        } catch (error) {
            setLoad(false);
            toast({ title: error.message, status: "error", position: "bottom-right", isClosable: true });
            console.error('Error adding new task:', error);
        }
        } else{
            toast({ title:"required all fields", status: "error", position: "bottom-right", isClosable: true });
        }
        
    };

    const Delete = async (selectday, selecttask) => {
        try {
            const remove = await axios.post(process.env.REACT_APP_database + '/deletetask', { selectday, selecttask });
            if (remove.data) {
                reload();
                toast({ title: "Delete successfully", status: "success", position: "top-right", isClosable: true });
            }
        } catch (error) {
            console.log(error);
            toast({ title: error.message, status: "error", position: "bottom-left", isClosable: true });
        }
    };

    const Edit = async (selectday, selecttask, selectdesc, selectmarks, index) => {
        try {
            const edit = await axios.post(process.env.REACT_APP_database + '/edittask', { selectday, selecttask, selectdesc, selectmarks, index });
            if (edit.data) {
                reload();
                setDay('');
                setTask('');
                setDescription('');
                setMarks('');
                toast({ title: "Edit successfully", status: "success", position: "top-right", isClosable: true });
                setUpdate(false);
            } else {
                toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true });
            }
        } catch (error) {
            console.log(error);
            toast({ title: error.message, status: "error", position: "bottom-left", isClosable: true });
        }
    };

    const EditTask = async (selectday, selecttask, selectdesc, selectmarks, index) => {
        try {
            setDay(selectday);
            setTask(selecttask);
            setDescription(selectdesc);
            setMarks(selectmarks);
            setUpdate(true);
            setIndexes(index);
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.log(error);
            toast({ title: error.message, status: "error", position: "bottom-left", isClosable: true });
        }
    };

    const Show = async (selectday, index) => {
        try {
            const show = await axios.post(process.env.REACT_APP_database + '/showtask', { selectday, index });
            if (show.data) {
                reload();
                toast({ title: "Access: show", status: "success", position: "top-right", isClosable: true });
            }
        } catch (error) {
            console.log(error);
            toast({ title: error.message, status: "error", position: "bottom-left", isClosable: true });
        }
    };

    const Hide = async (selectday, index) => {
        try {
            const hide = await axios.post(process.env.REACT_APP_database + '/hidetask', { selectday, index });
            if (hide.data) {
                reload();
                toast({ title: "Access: hide", status: "success", position: "top-right", isClosable: true });
            }
        } catch (error) {
            console.log(error);
            toast({ title: error.message, status: "error", position: "bottom-left", isClosable: true });
        }
    };

    const DayShow = async (dayshow) => {
        try {
            const show = await axios.post(process.env.REACT_APP_database + '/showday', { dayshow });
            if (show.data) {
                reload();
                toast({ title: "Access: show day", status: "success", position: "top-right", isClosable: true });
            }
        } catch (error) {
            console.log(error);
            toast({ title: error.message, status: "error", position: "bottom-left", isClosable: true });
        }
    };

    const DayHide = async (dayhide) => {
        try {
            const hide = await axios.post(process.env.REACT_APP_database + '/hideday', { dayhide });
            if (hide.data) {
                reload();
                toast({ title: "Access: hide day", status: "success", position: "top-right", isClosable: true });
            }
        } catch (error) {
            console.log(error);
            toast({ title: error.message, status: "error", position: "bottom-left", isClosable: true });
        }
    };

    const resetForm = () => {
        setDay('');
        setTask('');
        setDescription('');
        setMarks('');
        setUpdate(false);
    };

    return (
        <div className="task-form">
            <Stack spacing={4} ref={formRef}>
                <Input
                    placeholder="Enter day"
                    value={day}
                    onChange={(e) => setDay(e.target.value.replace(/[ ,.]/g, ''))}
                    size="lg"
                    type='number'
                />
                <Input
                    placeholder="Enter task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    size="lg"
                />
                <Input
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    size="lg"
                />
                <Input
                    placeholder="Enter marks"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    size="lg"
                />
                {update ? <Button colorScheme="cyan" onClick={() => Edit(day, task, description, marks, indexs)}>{load ? "Updating..." : "Update Task"}</Button> :
                    <Button colorScheme="cyan" onClick={handleSubmit}>{load ? "Adding..." : "Add Task"}</Button>}
                {update && <Button onClick={resetForm} colorScheme="teal">Add New Task</Button>}
            </Stack>

            <Box mt={8}>
                <div className='task-box'>
                    <h1 className='h1-tasks'>Tasks in Bootcamp</h1>
                    <Tabs variant='enclosed' isFitted isLazy >
                        <TabList overflowX="auto" overflowY="hidden">
                            {tasks.sort((a, b) => a.Day - b.Day).map((task, index) => (
                                <Tab key={index}>Day {task.Day}</Tab>
                            ))}
                        </TabList>

                        <TabPanels>
                            {tasks.sort((a, b) => a.Day - b.Day).map((task, index) => (
                                <TabPanel key={index}>
                                    <Box className='task-item' p={4} borderWidth={1} borderRadius="lg" mb={4}>
                                        <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                                            <Text fontWeight="bold" textAlign="center">Day {task?.Day}</Text>
                                            <div style={{ display: "flex", width: "30%", justifyContent: "right" }}>
                                                {!task?.Show ? <Button onClick={() => DayShow(task?.Day)}>Show</Button> : <Button onClick={() => DayHide(task?.Day)}>Hide</Button>}
                                            </div>
                                        </div>
                                        {
                                            task?.Tasks?.map((val, index) => (
                                                <React.Fragment key={index}>
                                                    <Text className='task-title'>Task: {val?.Task}</Text>
                                                    <Text className='task-description'>Description: {val?.Desc}</Text>
                                                    <Text>Marks : {val?.Marks}</Text>
                                                    <div className='task-select'>
                                                        <div className='task-select2'>
                                                            <Button bg="#CE5A67" color="white" onClick={() => Delete(task?.Day, val?.Task)}>Delete</Button>
                                                            <Button bg="#F4BF96" color="white" onClick={() => EditTask(task?.Day, val?.Task, val?.Desc, val?.Marks, index)}>Edit</Button>
                                                            {!val?.Show ? <Button bg="#1F1717" color="white" onClick={() => Show(task?.Day, index)}>Show</Button> :
                                                                <Button bg="#1F1717" color="white" onClick={() => Hide(task?.Day, index)}>Hide</Button>}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </React.Fragment>
                                            ))
                                        }
                                    </Box>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </div>
            </Box>
        </div>
    );
};

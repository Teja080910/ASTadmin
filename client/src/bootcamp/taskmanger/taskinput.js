import { Box, Button, Input, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import './bootcamptasks.css';

export const TaskInput = ({tasks,reload}) => {
    const [day, setDay] = useState('');
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [indexs,setIndexes]=useState();
    const [update,setUpdate]=useState(false)
    const [load, setLoad] = useState(false)
    const toast = useToast()

    const handleSubmit = async () => {
        setLoad(true)
        try {
            const response = await axios.post(process.env.REACT_APP_database + '/inserttask', { day, task, description });
            if (response.data) {
                setLoad(false)
                toast({ title: "insert sucessfully", status: "success", position: "top-right", isClosable: true })
                setDay('');
                setTask('');
                setDescription('');
            }
        } catch (error) {
            setLoad(false)
            toast({ title: error, status: "error", position: "bottom-left", isClosable: true })
            console.error('Error adding new task:', error);
        }
    };

    const Delete = async (selectday, selecttask) => {
        try {
            const remove = await axios.post(process.env.REACT_APP_database + '/deletetask', { selectday, selecttask });
            if (remove.data) {
                reload()
                toast({ title: "delete sucessfully", status: "success", position: "top-right", isClosable: true })
            }
        } catch (error) {
            console.log(error)
            toast({ title: error, status: "error", position: "bottom-left", isClosable: true })
        }
    }

    const Edit = async (selectday, selecttask,selectdesc,index) => {
        try {
            const edit = await axios.post(process.env.REACT_APP_database + '/edittask', { selectday, selecttask,selectdesc,index });
            if (edit.data) {
                reload()
                toast({ title: "edit sucessfully", status: "success", position: "top-right", isClosable: true })
            }
            else{
                toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true })
            }
        } catch (error) {
            console.log(error)
            toast({ title: error, status: "error", position: "bottom-left", isClosable: true })
        }
    }

    const EditTask = async (selectday, selecttask,selectdesc, index) => {
        try {
            setDay(selectday)
            setTask(selecttask)
            setDescription(selectdesc)
            setUpdate(true)
            setIndexes(index)
        } catch (error) {
            console.log(error)
            toast({ title: error, status: "error", position: "bottom-left", isClosable: true })
        }
    }

    const Show = async (selectday, index) => {
        try {
            const show = await axios.post(process.env.REACT_APP_database + '/showtask', { selectday, index });
            if (show.data) {
                reload()
                toast({ title: "access:show", status: "success", position: "top-right", isClosable: true })
            }
        } catch (error) {
            console.log(error)
            toast({ title: error, status: "error", position: "bottom-left", isClosable: true })
        }
    }

    const Hide = async (selectday, index) => {
        try {
            const hide = await axios.post(process.env.REACT_APP_database + '/hidetask', { selectday, index });
            if (hide.data) {
                reload()
                toast({ title: "access:hide", status: "success", position: "top-right", isClosable: true })
            }
        } catch (error) {
            console.log(error)
            toast({ title: error, status: "error", position: "bottom-left", isClosable: true })
        }
    }



    return (
        <div className="task-form">
            <Stack spacing={4}>
                <Input
                    placeholder="Enter day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    size="lg"
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
                {update?<Button colorScheme="cyan" onClick={()=>Edit(day,task,description,indexs)}>{load ? "Updating..." : "Update Task"}</Button>:
                <Button colorScheme="cyan" onClick={handleSubmit}>{load ? "Adding..." : "Add Task"}</Button>}
            </Stack>

            <Box mt={8}>
                <div className='task-box'>
                    <h1 className='h1-tasks'>Tasks in Bootcamp</h1>
                    {tasks?.map((task, index) => (
                        <Box key={index} className='task-item' p={4} borderWidth={1} borderRadius="lg" mb={4}>
                            <Text fontWeight="bold" textAlign="center">Day: {task?.Day}</Text>
                            {
                                task?.Tasks?.map((val, index) => (
                                    <>
                                        <Text className='task-title'>Task: {val?.Task}</Text>
                                        <Text className='task-description'>Description: {val?.Desc}</Text>
                                        <div className='task-select' >
                                           <div className='task-select2'>
                                           {<Button bg="#CE5A67" color="white" onClick={() => Delete(task?.Day, val?.Task, index)}>Delete</Button>}
                                            <Button bg="#F4BF96" color="white" onClick={() => EditTask(task?.Day, val?.Task,val?.Desc, index)}>Edit</Button>
                                            {!val?.Show?<Button bg="#1F1717" color="white" onClick={() => Show(task?.Day, index)}>Show</Button>:
                                            <Button bg="#1F1717" color="white" onClick={() => Hide(task?.Day, index)}>Hide</Button>}
                                           </div>
                                        </div>
                                    </>
                                ))
                            }
                        </Box>
                    ))}
                </div>
            </Box>
        </div>
    );
};



import { Box, Button, Input, Select, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import './ps.css';

export const PSInput = ({ tasks, reload }) => {
    const [number, setNumber] = useState('');
    const [statement, setStatement] = useState('');
    const [description, setDescription] = useState('');
    const [update, setUpdate] = useState(false)
    const [load, setLoad] = useState(false)
    const toast = useToast()

    const handleSubmit = async () => {
        setLoad(true)
        if (number && statement && description) {
            try {
                const response = await axios.post(process.env.REACT_APP_database + '/insertstatement', { number, statement, description,theme:sessionStorage?.theme});
                if (response?.data?.message) {
                    setLoad(false)
                    reload()
                    toast({ title: response?.data?.message, status: "success", position: "top-right", isClosable: true })
                    setNumber('');
                    setStatement('');
                    setDescription('');
                }
                if (response?.data?.error) {
                    setLoad(false)
                    reload()
                    toast({ title: response?.data?.error, status: "error", position: "bottom-right", isClosable: true })
                    setNumber('');
                    setStatement('');
                    setDescription('');
                }
            } catch (error) {
                setLoad(false)
                toast({ title: error, status: "error", position: "bottom-left", isClosable: true })
                console.error('Error adding new task:', error);
            }
        }
        else {
            setLoad(false)
            toast({ title: "Required all fields", status: "error", position: "bottom-left", isClosable: true })
        }
    };

    const Delete = async (selectstatement) => {
        try {
            const remove = await axios.post(process.env.REACT_APP_database + '/deletestatement', { selectstatement });
            if (remove.data) {
                reload()
                toast({ title: "delete sucessfully", status: "success", position: "top-right", isClosable: true })
            }
        } catch (error) {
            console.log(error)
            toast({ title: error, status: "error", position: "bottom-left", isClosable: true })
        }
    }

    const Edit = async (selectnumber, selectstatement, selectdesc) => {
        try {
            const edit = await axios.post(process.env.REACT_APP_database + '/editstatement', { selectnumber, selectstatement, selectdesc,theme:sessionStorage?.theme});
            if (edit.data) {
                reload()
                setNumber('');
                setStatement('');
                setDescription('');
                toast({ title: "edit sucessfully", status: "success", position: "top-right", isClosable: true })
            }
            else {
                toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true })
            }
        } catch (error) {
            console.log(error)
            toast({ title: error, status: "error", position: "bottom-left", isClosable: true })
        }
    }

    const EditTask = async (selectstatement, selectnumber, selectdesc,theme) => {
        try {
            setNumber(selectnumber)
            setStatement(selectstatement)
            setDescription(selectdesc)
            setUpdate(true)
        } catch (error) {
            console.log(error)
            toast({ title: error, status: "error", position: "bottom-left", isClosable: true })
        }
    }

    return (
        <div className="task-form">
            <Stack spacing={4}>
                <Select onChange={(e)=>sessionStorage.theme=e.target.value}>
                    <option>Choose Theme</option>
                    <option value="yoga">Yoga</option>
                    <option value='sports'>Sports</option>
                </Select>
                <Input placeholder="Enter Statement Number" value={number} onChange={(e) => { setNumber(e.target.value) }} size="lg" type='number' />
                <Input placeholder="Enter Statement" value={statement} onChange={(e) => setStatement(e.target.value)} size="lg" />
                <Input
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    size="lg"
                />
                {update ? <Button colorScheme="cyan" onClick={() => Edit(number, statement, description)}>{load ? "Updating..." : "Update Statement"}</Button> :
                    <Button colorScheme="cyan" onClick={handleSubmit}>{load ? "Adding..." : "Add Statement"}</Button>}
            </Stack>

            <Box mt={8}>
                <div className='task-box'>
                    <h1 className='h1-tasks'>Problem Statements</h1>
                    {tasks?.map((task, index) => (
                        <Box key={index} className='task-item' p={4} borderWidth={1} borderRadius="lg" mb={4}>
                            <Text fontWeight="bold" textAlign="center">Problem Statement {task?.Number}</Text>
                            <Text className='task-title'>Task : {task?.Statement}</Text>
                            <Text className='task-description'>Description : {task?.Desc}</Text>
                            <Text>Theme : {task?.Theme}</Text>
                            <div className='task-select' >
                                <div className='task-select2'>
                                    {<Button bg="#CE5A67" color="white" onClick={() => Delete(task?.Statement)}>Delete</Button>}
                                    <Button bg="#F4BF96" color="white" onClick={() => EditTask(task?.Statement, task?.Number, task?.Desc,task?.Theme)}>Edit</Button>
                                </div>
                            </div>
                        </Box>
                    ))}
                </div>
            </Box>
        </div>
    );
};



import { Box, Button, Input, Select, Stack, Text, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import './ps.css';
import { CountProblemStatement } from './psscount';

export const PSInput = ({ tasks, reload }) => {
    const [number, setNumber] = useState('');
    const [statement, setStatement] = useState('');
    const [description, setDescription] = useState('');
    const [update, setUpdate] = useState(false);
    const [load, setLoad] = useState(false);
    const toast = useToast();
    const [show, setShow] = useState(true)

    const numberRef = useRef(null);
    const statementRef = useRef(null);
    const descriptionRef = useRef(null);

    const handleSubmit = async () => {
        setLoad(true);
        if (number && statement && description) {
            try {
                const response = await axios.post(process.env.REACT_APP_database + '/insertstatement', { number, statement, description, theme: sessionStorage?.theme });
                if (response?.data?.message) {
                    setLoad(false);
                    reload();
                    toast({ title: response?.data?.message, status: "success", position: "top-right", isClosable: true });
                    setNumber('');
                    setStatement('');
                    setDescription('');
                }
                if (response?.data?.error) {
                    setLoad(false);
                    reload();
                    toast({ title: response?.data?.error, status: "error", position: "bottom-right", isClosable: true });
                    // setNumber('');
                    // setStatement('');
                    // setDescription('');
                }
            } catch (error) {
                setLoad(false);
                toast({ title: error.message, status: "error", position: "bottom-left", isClosable: true });
                console.error('Error adding new task:', error);
            }
        } else {
            setLoad(false);
            toast({ title: "All fields are required", status: "error", position: "bottom-left", isClosable: true });
        }
    };

    const handleDelete = async (selectStatement) => {
        try {
            const remove = await axios.post(process.env.REACT_APP_database + '/deletestatement', { selectstatement: selectStatement });
            if (remove.data) {
                reload();
                toast({ title: "Deleted successfully", status: "success", position: "top-right", isClosable: true });
            }
        } catch (error) {
            console.log(error);
            toast({ title: error.message, status: "error", position: "bottom-left", isClosable: true });
        }
    };

    const handleEdit = async (selectNumber, selectStatement, selectDesc) => {
        setLoad(true);
        try {
            const edit = await axios.post(process.env.REACT_APP_database + '/editstatement', { selectnumber: selectNumber, selectstatement: selectStatement, selectdesc: selectDesc, theme: sessionStorage?.theme });
            if (edit.data) {
                reload();
                setNumber('');
                setStatement('');
                setDescription('');
                setUpdate(false);
                toast({ title: "Edited successfully", status: "success", position: "top-right", isClosable: true });
            } else {
                toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true });
            }
        } catch (error) {
            console.log(error);
            toast({ title: error.message, status: "error", position: "bottom-left", isClosable: true });
        } finally {
            setLoad(false);
        }
    };

    const handleEditTask = (selectStatement, selectNumber, selectDesc) => {
        setNumber(selectNumber);
        setStatement(selectStatement);
        setDescription(selectDesc);
        setUpdate(true);

        // Focus on the first input
        if (numberRef.current) {
            numberRef.current.focus();
        }
    };

    return (
        <div className="task-form">
            <CountProblemStatement show={show} hide={() => setShow(show ? false : true)} />
            <Stack spacing={4} p={4}>
                <Select onChange={(e) => sessionStorage.theme = e.target.value}>
                    <option>Choose Theme</option>
                    <option value="yoga">Yoga and Health</option>
                    <option value='sports'>Sports</option>
                </Select>
                <Input ref={numberRef} placeholder="Enter Statement Number" value={number} onChange={(e) => { setNumber(e.target.value) }} size="lg" type='number' />
                <Input ref={statementRef} placeholder="Enter Statement" value={statement} onChange={(e) => setStatement(e.target.value)} size="lg" />
                <Textarea
                    ref={descriptionRef}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    size="lg"
                />
                {update ? <Button colorScheme="cyan" onClick={() => handleEdit(number, statement, description)}>{load ? "Updating..." : "Update Statement"}</Button> :
                    <Button colorScheme="cyan" onClick={handleSubmit}>{load ? "Adding..." : "Add Statement"}</Button>}
            </Stack>

            <Box mt={8}>
                <div className='task-box'>
                    <h1 className='h1-tasks'>Problem Statements</h1>
                    {tasks?.map((task, index) => (
                        task?.Number && <Box key={index} className='task-item' p={4} borderWidth={1} borderRadius="lg" mb={4}>
                            <Text fontWeight="bold" textAlign="center">Problem Statement {task?.Number}</Text>
                            <Text className='task-title'>Title : {task?.Statement}</Text>
                            <Text className='task-description'>Description : {task?.Desc}</Text>
                            <Text>Theme : {task?.Theme}</Text>
                            <div className='task-select' >
                                <div className='task-select2'>
                                    <Button bg="#CE5A67" color="white" onClick={() => handleDelete(task?.Statement)}>Delete</Button>
                                    <Button bg="#F4BF96" color="white" onClick={() => handleEditTask(task?.Statement, task?.Number, task?.Desc, task?.Theme)}>Edit</Button>
                                </div>
                            </div>
                        </Box>
                    ))}
                </div>
            </Box>
        </div>
    );
};

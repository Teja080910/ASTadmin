import { Box, Button, Input, Select, Stack, Text, useToast,Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../actions/actions';
import './hackathontasks.css';

export const RoundInput = ({ tasks, reload }) => {
    const [round, setRound] = useState('');
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [team, setTeam] = useState('');
    const [search, setSearch] = useState('');
    const [load, setLoad] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch();
    const saveround = useSelector((state) => state.user.round);

    const handleSubmit = async () => {
        setLoad(true)
        console.log(task, round, description, team)
        if ((round || saveround) && task && description && team) {
            try {
                const response = await Actions.InsertRound(team, (round || saveround), task, description);
                if (response?.data?.message) {
                    setLoad(false)
                    toast({ title: response?.data?.message, status: "success", position: "top-right", isClosable: true })
                    reload()
                    setRound('');
                    setTask('');
                    setDescription('');
                    setTeam('');
                }
                if (response?.data?.error) {
                    setLoad(false)
                    toast({ title: response?.data?.error, status: "error", position: "bottom-right", isClosable: true })
                }
            } catch (error) {
                setLoad(false)
                toast({ title: error, status: "error", position: "bottom-right", isClosable: true })
                console.error('Error adding new task:', error);
            }
        }
        else {
            setLoad(false)
            toast({ title: "Required all fields", status: "error", position: "bottom-right", isClosable: true })
        }
    };

    const Delete = async (team, round, task, description) => {
        try {
            console.log(team, round, task, description)
            const response = await Actions.DeleteRound(team, round, task, description);
            if (response?.data?.message) {
                setLoad(false)
                toast({ title: response?.data?.message, status: "success", position: "top-right", isClosable: true })
                reload()
            }
            if (response?.data?.error) {
                setLoad(false)
                toast({ title: response?.data?.error, status: "error", position: "bottom-right", isClosable: true })
            }
        } catch (error) {
            setLoad(false)
            toast({ title: error, status: "error", position: "bottom-right", isClosable: true })
            console.error('Error adding new task:', error);
        }
    }

    return (
        <div className="task-form">
            <Stack spacing={4}>
                <Select placeholder="Select Round" value={round || saveround} onChange={(e) => { setRound(e.target.value); dispatch({ type: 'ROUND', payload: { round: e.target.value } }); }} size="lg" type='number'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Select>
                <Select placeholder="Select Team Code" value={team} onChange={(e) => setTeam(e.target.value)} size="lg">
                    {
                        tasks?.map((team) => (
                            <option>{team?.TeamCode}</option>
                        ))
                    }
                </Select>
                <Input placeholder="Enter task" value={task} onChange={(e) => setTask(e.target.value)} size="lg" />
                <Input
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    size="lg"
                />
                <Button colorScheme="cyan" onClick={handleSubmit}>{load ? "Updating......" : "Update Round"}</Button>
            </Stack>
            <Box mt={8}>
                <div className='task-box'>
                    <h1 className='h1-tasks'>Rounds in Hackathon</h1>
                    <Input className='task-item' onChange={(e) => setSearch(e.target.value)} placeholder='Enter team code or name' style={{ width: '50%', height: '0.2vh' }} />
                    {tasks?.filter(team => team?.Team?.toLowerCase()?.includes(search) || team?.TeamCode.toString().includes(search))?.map((task, index) => (
                        <Box key={index} className='task-item' p={4} borderWidth={1} borderRadius="lg" mb={4}>
                            <div className='teamhead'>
                                {/* <Heading style={{ fontFamily: 'serif', color: 'darkgreen' }} as="h2" size="md">{task?.Team}</Heading> */}
                                {/* <Heading style={{ fontFamily: 'serif', color: 'blue' }} as="h2" size="md">{task?.TeamCode}</Heading> */}
                                <Text fontWeight="bold" textAlign="center">Team Name <strong style={{ color: 'blue' }}>{task?.Team || <strong style={{ color: 'red' }}>Not Registered</strong>}</strong> </Text>
                                <Text fontWeight="bold" textAlign="center">Team Code <strong style={{ color: 'blue' }}>{task?.TeamCode}</strong></Text>
                            </div>
                            <>
                                {
                                    task?.Rounds && Object.values(task?.Rounds).map((val, taskindex) => (
                                        <>
                                            <h5 style={{ display: 'flex', justifyContent: 'center', color: 'green' }}>Round : {taskindex + 1}</h5>
                                            <Text className='task-title'>Task: {val?.Task}</Text>
                                            <Text className='task-description'>Description: {val?.Desc}</Text>
                                            <div className='task-select' >
                                                <div className='task-select2'>
                                                    {<Button bg="#CE5A67" color="white" onClick={() => Delete(task?.TeamCode, (taskindex + 1), val?.Task, val?.Desc)}>Delete</Button>}
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </>
                        </Box>
                    ))}
                </div>
            </Box>
        </div>
    );
};
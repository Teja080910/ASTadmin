import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Spinner,
    Text,
    useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Actions } from "../../actions/actions";
import './hackscore.css';

export const HackScore = () => {
    const [dat, setDat] = useState([]);
    const [select, setSelect] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [marks, setMarks] = useState('');
    const toast = useToast()

    const fetchStudentData = async () => {
        await Actions.TeamsCodes()
            .then((res) => {
                setDat(res?.data)
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e)
            })
    };

    const GivenMarks = async (code, marks, taskindex) => {
        await Actions.Roundmarks(code, marks, taskindex)
            .then((res) => {
                if (res?.data) {
                    fetchStudentData()
                    toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true })
                } else {
                    toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true })
                }
            })
            .catch((e) => {
                toast({ title: e?.message, status: 'error', position: 'bottom-right', isClosable: true })
            })
    }

    useEffect(() => {
        fetchStudentData();
    }, []);
    return (
        <div className="scores">
            <br />
            <Box display="flex" justifyContent="center" mb={6}>
                <Input
                    id="search"
                    value={select}
                    placeholder="Enter User mail or name"
                    onChange={(e) => setSelect(e.target.value)}
                    width="70%"
                />
            </Box>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <Spinner size="xl" />
                </Box>
            ) : (
                <Flex flexDirection="column" alignItems="center">
                    {dat.filter(user =>
                        user?.Team?.toLowerCase().includes(select) ||
                        user?.Team?.toUpperCase().includes(select) ||
                        user?.TeamCode?.toString().includes(select)
                    )
                        .map((x, index) => (
                            <Box
                                style={{ fontFamily: 'serif' }}
                                key={index}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                shadow="lg"
                                m={4}
                                p={4}
                                textAlign="center"
                                width="100%"
                                maxW="xx-l"
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Heading style={{ fontFamily: 'serif', color: 'darkgreen' }} as="h2" size="md">{x?.Team}</Heading>
                                    <Heading style={{ fontFamily: 'serif', color: 'blue' }} as="h2" size="md">{x?.TeamCode}</Heading>
                                </div>
                                {
                                    Object?.values(x?.Rounds ? x?.Rounds : 0)?.map((val, taskindex) => (
                                        <div>
                                            {
                                                <Text className="boxscores" mt={2}>
                                                    <h5>Round {taskindex + 1}: {val?.Task}</h5>
                                                    <p>score:<input style={{ textAlign: 'center' }} id={val?.Task} className="blank-input" placeholder='Enter task1 score'
                                                        value={marks[val?.Task] || val?.Marks || ''}
                                                        onChange={(e) => setMarks(state => ({ ...state, [val?.Task]: e.target.value }))}
                                                    /></p>
                                                    <Button mt={2} onClick={() => GivenMarks(x?.TeamCode, marks[val?.Task], (taskindex + 1))}>Save</Button>
                                                </Text>
                                            }
                                        </div>
                                    ))
                                }
                            </Box>
                        ))}
                </Flex>
            )}
        </div>
    );
};
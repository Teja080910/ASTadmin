import {
    Badge,
    Box,
    Flex,
    Heading,
    Input,
    Spinner,
    Text,
    Button
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './scoremanager.css';

export const BootcampScore = () => {
    const [dat, setDat] = useState([]);
    const [select, setSelect] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [task1Score, setTask1Score] = useState({});
    const [task2Score, setTask2Score] = useState({});

    const fetchStudentData = async () => {
        try {
            const result = await axios.post(process.env.REACT_APP_database + "/students");
            setDat(result.data.sort((a, b) => a.Year - b.Year));
        } catch (error) {
            console.error("Error fetching student data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);
    return (
        <div className="scores">
            <div className="clgname">VEDIC VISION BOOTCAMP</div>
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
                    {dat
                        .filter(user =>
                            user.Reg_No.toLowerCase().includes(select) ||
                            user.Reg_No.toUpperCase().includes(select) ||
                            user.Name.toUpperCase().includes(select) ||
                            user.Name.toLowerCase().includes(select)
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
                                <Heading style={{ fontFamily: 'serif' }} as="h2" size="md">{x.Name.toUpperCase()}</Heading>
                                <Flex justifyContent="space-between" alignItems="center" mt={2}>
                                    <Badge style={{ marginLeft: '80%' }} colorScheme="blue">{x.Year} Btech</Badge>
                                </Flex>
                                <Text mt={2}>
                                    Task 1 score: {x.Task1}
                                    
                                </Text>
                                <Text mt={2}>
                                    Task 2 score: {x.Task2}
                                    
                                </Text>
                                <input
                                        className="blank-input"
                                        placeholder='Enter task1 score'
                                    /><br/>
                                    <input
                                        className="blank-input"
                                        placeholder='Enter task2 score'
                                    /><br/>
                                <Button mt={2}>Save</Button>
                            </Box>
                        ))}
                </Flex>
            )}
        </div>
    );
};

export default BootcampScore;

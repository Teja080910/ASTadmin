import {
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './scoremanager.css';

export const BootcampScore = () => {
    const [dat, setDat] = useState([]);
    const [select, setSelect] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [task1ScoreInput, setTask1ScoreInput] = useState("");
    const [task2ScoreInput, setTask2ScoreInput] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = (student) => {
        setSelectedStudent(student);
        setTask1ScoreInput(student.Task1 || "");
        setTask2ScoreInput(student.Task2 || "");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const saveScores = () => {
        const updatedStudents = dat.map(student => {
            if (student.Reg_No === selectedStudent.Reg_No) {
                return {
                    ...student,
                    Task1: task1ScoreInput,
                    Task2: task2ScoreInput
                };
            }
            return student;
        });
        setDat(updatedStudents);
        setIsModalOpen(false);
    };

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
                <Flex flexWrap="wrap" justifyContent="center">
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
                                maxW="sm"
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                shadow="md"
                                m={4}
                                p={4}
                                textAlign="center"
                                width="300px"
                            >
                                <Heading style={{ fontFamily: 'serif' }} as="h2" size="md">{x.Name.toUpperCase()}</Heading>
                                <Flex justifyContent="space-between" alignItems="center" mt={2}>
                                    <Badge style={{ marginLeft: '80%' }} colorScheme="blue">{x.Year} Btech</Badge>
                                </Flex>
                                <Text mt={2}>Task 1 score: {x.Task1}</Text>
                                <Text mt={2}>Task 2 score: {x.Task2}</Text>
                                <Button mt={8} onClick={() => openModal(x)}>Give score</Button>
                            </Box>
                        ))}
                </Flex>
            )}
            {selectedStudent && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader style={{ fontFamily: 'serif' }}>{selectedStudent?.Name.toUpperCase()} Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody style={{ fontFamily: 'inherit', fontWeight: 'bold' }}>
                            <Text fontSize="sm">Register Number: {selectedStudent?.Reg_No.toUpperCase()}</Text>
                            <Text fontSize="sm">Tasks Assigned: {selectedStudent?.Tasks}</Text>

                            <Flex flexDirection="column" mt={4}>
                                <Input mb={4} value={task1ScoreInput} onChange={(e) => setTask1ScoreInput(e.target.value)} placeholder="Enter Task 1 score" />
                                <Input mb={4} value={task2ScoreInput} onChange={(e) => setTask2ScoreInput(e.target.value)} placeholder="Enter Task 2 score" />
                            </Flex>

                            <Flex justifyContent="space-between" alignItems="center" mt={2}>
                                <Badge colorScheme="blue">{selectedStudent?.Year} Btech</Badge>
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={closeModal}>
                                Close
                            </Button>
                            <Button colorScheme="blue" mr={3} onClick={saveScores}>Save</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
};

export default BootcampScore;

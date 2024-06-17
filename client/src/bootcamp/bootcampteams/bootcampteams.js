import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Text, Heading, Spinner, Badge, Input, useToast, Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

export const BootcampTeam = () => {
    const [dat, setDat] = useState([]);
    const [select, setSelect] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const toast = useToast();

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
    };

    const closeModal = () => {
        setSelectedStudent(null);
    };

    const groupStudentsIntoTeams = (students, teamSize) => {
        const teams = [];
        for (let i = 0; i < students.length; i += teamSize) {
            const team = students.slice(i, i + teamSize);
            teams.push(team.map(student => ({ ...student, teamIndex: Math.floor(i / teamSize) + 1 })));
        }
        return teams;
    };

    const filteredData = dat.filter(user =>
        (user.teamIndex && (`team${user.teamIndex}`).toLowerCase().includes(select.toLowerCase()))
    );

    const teams = groupStudentsIntoTeams(dat, 4);

    return (
        <>
            <div className="clgname">VEDIC VISION BOOTCAMP</div>
            <br />
            <Box display="flex" justifyContent="center" mb={6}>
                <Input id="search" value={select} placeholder="Enter Team Number (e.g., team1)" onChange={(e) => setSelect(e.target.value)} width="70%" />
            </Box>
            {
                isLoading ?
                    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                        <Spinner size="xl" />
                    </Box>
                    :
                    <Table variant="simple" width="80%" margin="auto">
                        <Thead>
                            <Tr>
                                <Th>Team</Th>
                                <Th>Name</Th>
                                <Th>Year</Th>
                                <Th>Details</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {teams.flat().filter(student => `team${student.teamIndex}`.toLowerCase().includes(select.toLowerCase())).map((x, index) => (
                                <Tr key={index}>
                                    {index % 4 === 0 && (
                                        <Td rowSpan={4}>
                                            Team {x.teamIndex}
                                        </Td>
                                    )}
                                    <Td>{x.Name.toUpperCase()}</Td>
                                    <Td>{x.Year} Btech</Td>
                                    <Td>
                                        <Button onClick={() => openModal(x)}>View Details</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
            }

            
        </>
    );
};

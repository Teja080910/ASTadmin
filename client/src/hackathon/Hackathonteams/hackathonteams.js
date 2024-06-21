import { Box, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const HackathonTeam = () => {
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
            <Box display="flex" justifyContent="center" mb={6}>
                <Input id="search" value={select} placeholder="Enter Team Number (e.g., team1)" onChange={(e) => setSelect(e.target.value)} width="70%" />
            </Box>
        </>
    );
};

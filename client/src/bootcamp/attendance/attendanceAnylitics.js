import React, { useState } from "react";
import {
    Box,
    Text,
    Card,
    CardBody,
    CardHeader,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";

import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { height } from "@mui/system";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const StudentAttendancePortal = ({ dat, date }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [view, setView] = useState("card"); // State to manage the current view
    const currentYear = sessionStorage.year;
    const totalStudents = dat?.filter((student) => student?.Name)?.length;
    const currentYearStudents = dat?.filter(
        (student) => student?.Year.toString() === currentYear
    )?.length;
    const currentYearAbsent = dat?.filter(
        (student) =>
            student?.Year.toString() === currentYear &&
            student?.Date !== date.toDateString()
    )?.length;
    const currentYearAttend = dat?.filter(
        (student) =>
            student?.Year.toString() === currentYear &&
            student?.Date === date.toDateString()
    )?.length;
    const totalAttend = dat?.filter(
        (student) => student?.Date === date.toDateString()
    )?.length;
    const totalAbsent = dat?.filter(
        (student) => student?.Date !== date.toDateString()
    )?.length;

    const data = {
        labels: [
            "Total Students",
            `${currentYear} Year Students`,
            `${currentYear} Year Absentees`,
            `${currentYear} Year Attendees`,
            "Total Attendees",
            "Total Absentees",
        ],
        datasets: [
            {
                label: "Students",
                data: [
                    totalStudents,
                    currentYearStudents,
                    currentYearAbsent,
                    currentYearAttend,
                    totalAttend,
                    totalAbsent,
                ],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
               
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Student Attendance Statistics",
            },
        },
    };

    const handleToggleView = (view) => {
        setView(view);
    };

    return (
        <Box>
            <Button onClick={onOpen} borderRadius={25} colorScheme="purple">
                <StackedLineChartIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Student Attendance Statistics</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display={"flex"} justifyContent={"end"}>
                            <Box
                                width={"fit-content"}
                                display={"flex"}
                                justifyContent={"center"}
                                bg={"gray.200"}
                                p={2}
                                borderRadius={10}
                                gap={3}
                                m={1}
                                color={"white"}
                            >
                                <Button
                                    onClick={() => handleToggleView("card")}
                                    colorScheme={view === "graph" ? "gray" : "purple"}
                                >
                                    <DashboardIcon />
                                </Button>
                                <Button
                                    onClick={() => handleToggleView("graph")}
                                    colorScheme={view === "card" ? "gray" : "purple"}
                                >
                                    <BarChartIcon />
                                </Button>
                            </Box>
                        </Box>
                        <Box padding="4" borderWidth="1px" borderRadius="lg">
                            {view === "card" ? (
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                                    <Card borderColor={"purple"}>
                                        <CardHeader color={"purple"}>
                                            <Text fontSize="20px">Total Students - {totalStudents}</Text>
                                        </CardHeader>
                                      
                                        <CardBody>
                                            <Text>Attendees: {totalAttend}</Text>
                                            <Text>Absentees: {totalAbsent}</Text>
                                        </CardBody>

                                    </Card>

                                    <Card>
                                        <CardHeader color={"green"}>
                                            <Text fontSize="20px">{currentYear} Year Students - {currentYearStudents}</Text>
                                        </CardHeader>
                                        <CardBody>
                                        <Text>Attend: {currentYearAttend}</Text>
                                            <Text>Absent: {currentYearAbsent}</Text>         
                                        </CardBody>
                                    </Card>


                                </SimpleGrid>
                            ) : (
                                <Box mt={5}>
                                    <Bar data={data} options={options} />
                                </Box>
                            )}
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default StudentAttendancePortal;

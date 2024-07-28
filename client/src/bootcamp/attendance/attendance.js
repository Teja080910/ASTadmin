import {
    Accordion,
    AccordionItem,
    Badge,
    Box,
    Button,
    Input,
    Spinner,
    Text,
    useToast
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BootcampNav } from "../bootcampnav/bootcampnav";
import './attendance.css';

export const BootAttendance = () => {
    const [dat, sdat] = useState([]);
    const [select, sselect] = useState("");
    const [year, syear] = useState(sessionStorage.year || 1);
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [regd, setRegd] = useState();
    const [filteredData, setFilteredData] = useState([]);
    const date = new Date();
    const toast = useToast();
    const searchRef = useRef(null);

    const Attend = async (registerno) => {
        try {
            setShow(true);
            const response = await axios.post(process.env.REACT_APP_database + "/attendstudent" ,{registerno});
            if (response?.data?.message) {
                toast({ title: registerno + " Attend", status: "success", position: "top", isClosable: true });
                fetchData();
            } else {
                toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const Absent = async (registerno) => {
        try {
            const response1 = await axios.post(process.env.REACT_APP_database + "/absentstudent" , {registerno});
            if (response1) {
                toast({ title: registerno + " Absent", status: "success", position: "top", isClosable: true });
                fetchData();
            } else {
                toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const Year = (selectedYear) => {
        sessionStorage.year = selectedYear;
        syear(selectedYear);
    };

    const fetchData = async () => {
        setIsLoading(true);
        await axios.post(process.env.REACT_APP_database + "/bootcampstudents")
            .then((result) => {
                sdat(result.data.sort((a, b) => a.Year - b.Year));
                setFilteredData(result.data.sort((a, b) => a.Year - b.Year));
            })
            .catch((e) => console.log(e))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, [year]);

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
        const handleKeyPress = (event) => {
            if (event.shiftKey && event.key === 'F') {
                event.preventDefault();
                if (searchRef.current) {
                    searchRef.current.focus();
                }
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const fetchfilterData = async () => {
        const filtered = dat?.filter(user =>
            (user?.Reg_No?.toLowerCase().includes(select) ||
                user?.Reg_No?.toUpperCase().includes(select) ||
                user?.Name?.toUpperCase().includes(select) ||
                user?.Name?.toLowerCase().includes(select)) &&
            ((parseInt(user?.Year) || parseInt((user?.Year[0]))) === parseInt(sessionStorage.year))
        );
        setFilteredData(filtered);
    }

    useEffect(() => {
        fetchfilterData()
    }, [select, dat, year]);

    const handleAttendStudents = () => {
        setFilteredData(dat.filter(student => student?.Date === date.toDateString()));
    };

    const handleAbsentStudents = () => {
        setFilteredData(dat.filter(student => student?.Date !== date.toDateString()));
    };

    return (
        <>
            <BootcampNav />
            <div className="yearbtns">
                <Button className="yearbtnsink" style={{ backgroundColor: '#17D7A0', borderRadius: '10px', border: year === 1 ? "solid 3px black" : "white", }} onClick={() => Year(1)}><b>I B.Tech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#CCA8E9', borderRadius: '10px', border: year === 2 ? "solid 3px black" : "white" }} onClick={() => Year(2)}><b>II B.Tech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#A1EAFB', borderRadius: '10px', border: year === 3 ? "solid 3px black" : "white" }} onClick={() => Year(3)}><b>III B.Tech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#F185B3', borderRadius: '10px', border: year === 4 ? "solid 3px black" : "white" }} onClick={() => Year(4)}><b>IV B.Tech</b></Button>
            </div>
            <br />
            <div>
                <Box display="flex" justifyContent="center" mb={6}>
                    <Input
                        ref={searchRef}
                        id="search"
                        value={select}
                        placeholder="Enter User mail or name"
                        onChange={(e) => sselect(e.target.value)}
                        width="50%"
                    />
                </Box>
                <table className="studetail">
                    <tr>
                        <td style={{ display: 'grid', justifyContent: 'center' }}>
                            <Text align={"left"} fontSize={"20px"}>Total No of Students - {dat?.filter(student => student?.Name)?.length}</Text>
                            <Text width={"100%"} fontSize={"20px"} display={"flex"} justifyContent={"space-evenly"}>
                                <p>{sessionStorage.year} Year Students - {dat?.filter(student => student?.Year.toString() === sessionStorage.year)?.length}</p>
                                 | <p>Absent - {dat?.filter(student => student?.Year.toString() === sessionStorage.year && student?.Date !== date.toDateString())?.length}</p>
                                 | <p>Attend - {dat?.filter(student => student?.Year.toString() === sessionStorage.year && student?.Date === date.toDateString())?.length}</p>
                            </Text>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Text align={"left"} fontSize={"20px"}>Total No of Students Attend - {dat?.filter(student => student?.Date === date.toDateString())?.length}</Text>
                            <Text align={"left"} fontSize={"20px"}>Total No of Students Absent - {dat?.filter(student => student?.Date !== date.toDateString())?.length}</Text>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button bg={"blue.500"} onClick={handleAttendStudents}>Attend Students</Button>
                            <Button bg={"blue.500"} onClick={handleAbsentStudents}>Absent Students</Button>
                        </td>
                    </tr>
                    {
                        isLoading ?
                            <tr>
                                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                                    <Spinner size="xl" />
                                </Box>
                            </tr> :
                            <Accordion allowToggle>
                                {filteredData?.length > 0 ? filteredData?.map((x, index) => (
                                    <AccordionItem key={index} style={{ display: 'flex', justifyContent: 'space-evenly' }} p={1} >
                                        <Box style={{ fontFamily: 'bold' }} flex="1" textAlign="left">
                                            {index + 1}. {x?.Name.toUpperCase()} ({x?.Reg_No.toUpperCase()})
                                        </Box>
                                        {x?.Date !== date.toDateString() ?
                                            <Button colorScheme="blue" onClick={() => { Attend(x?.Reg_No) }} onClickCapture={() => setRegd({ num: x?.Reg_No, name: x?.Name })}>Attend</Button> :
                                            <Button colorScheme="red" onClick={() => Absent(x?.Reg_No)}>Absent</Button>
                                        }
                                    </AccordionItem>
                                )) : (
                                    <tr textAlign="center" width="100%">
                                        <Text>
                                            No data matches your current Search <Badge>{select}</Badge> or the selected Year <Badge>{year} B.Tech</Badge>
                                        </Text>
                                    </tr>
                                )}
                            </Accordion>
                    }
                </table>
            </div>
        </>
    );
};
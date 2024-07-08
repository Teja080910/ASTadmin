import {
    Accordion,
    AccordionItem,
    Box,
    Input,
    Spinner,
    useToast
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { BootcampNav } from "../bootcampnav/bootcampnav";
import './attendance.css';
export const BootAttendance = () => {
    const [dat, sdat] = useState([]);
    const [select, sselect] = useState([]);
    const [year, syear] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const date = new Date();
    const toast = useToast()
    // window.title = "Student Attendance | Bootcamp | VEDIC VISION | TEAM AST"
    const Attend = async (registerno) => {
        try {
            const responce = await axios.post(process.env.REACT_APP_database + "/attendstudent/" + registerno)
            {
                if (responce?.data?.message) {
                    toast({ title: registerno + " Attend", status: "success", position: "top", isClosable: true })
                    fetchData()
                }
                else {
                    toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true })
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const Absent = async (registerno) => {
        try {
            const responce1 = await axios.post(process.env.REACT_APP_database + "/absentstudent/" + registerno)
            {
                if (responce1) {
                    toast({ title: registerno + " Absent", status: "success", position: "top", isClosable: true })
                    fetchData()
                }
                else {
                    toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true })
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const Year = () => {
        sessionStorage.year = year;
    }
    const fetchData = async () => {
        await axios.post(process.env.REACT_APP_database + "/bootcampstudents")
            .then((result) => {
                sdat((result.data.sort((a, b) => a.Year - b.Year)));
                console.log(dat.map((val) => val.Reg_No))
            })
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }
    useEffect(() => {
        fetchData()
    }, [year])
    return (
        <>
            <BootcampNav />
            <div className="yearbtns">
                <Button className="yearbtnsink" style={{ backgroundColor: '#17D7A0', borderRadius: '10px', borderColor: 'white' }} onClick={Year} onClickCapture={(e) => { syear(1) }}><b>I Btech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#CCA8E9', borderRadius: '10px', borderColor: 'white' }} onClick={Year} onClickCapture={(e) => { syear(2) }}><b>II Btech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#A1EAFB', borderRadius: '10px', borderColor: 'white' }} onClick={Year} onClickCapture={(e) => { syear(3) }}><b>III Btech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#F185B3', borderRadius: '10px', borderColor: 'white' }} onClick={Year} onClickCapture={(e) => { syear(4) }}><b>IV Btech</b></Button>
            </div>
            <br />
            <div>
                <Box display="flex" justifyContent="center" mb={6}>
                    <Input id="search" value={select} placeholder="Enter User mail or name" onChange={(e) => sselect(e.target.value)} width="50%" />
                </Box>
                <table className="studetail">
                    {
                        isLoading ?
                            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                                <Spinner size="xl" />
                            </Box> :
                            <Accordion allowToggle>
                                {dat.filter(user =>
                                (user?.Reg_No?.toLowerCase().includes(select) ||
                                    user?.Reg_No?.toUpperCase().includes(select) ||
                                    user?.Name?.toUpperCase().includes(select) ||
                                    user?.Name?.toLowerCase().includes(select))
                                ).map((x, index) => (
                                    (x?.Year && (x?.Year[0])) == sessionStorage.year &&
                                    <AccordionItem key={index} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                        <Box style={{ fontFamily: 'bold' }} flex="1" textAlign="left">
                                            {index + 1}. {x?.Name.toUpperCase()} ({x?.Reg_No.toUpperCase()})
                                        </Box>
                                        {x.Date !== date.toDateString() ?
                                            <Button colorScheme="blue" onClick={() => Attend(x?.Reg_No)}>Attend</Button> :
                                            <Button colorScheme="red" onClick={() => Absent(x?.Reg_No)}>Absent</Button>
                                        }
                                    </AccordionItem>
                                ))}
                            </Accordion>
                    }
                </table>
            </div>
        </>
    )
}
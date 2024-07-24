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
import { Authentication } from "../../actions/auths";
import { BootcampNav } from "../bootcampnav/bootcampnav";
import './attendance.css';

export const BootAttendance = () => {
    const [dat, sdat] = useState([]);
    const [select, sselect] = useState("");
    const [year, syear] = useState(sessionStorage.year || 1);
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false)
    const [regd, setRegd] = useState()
    const date = new Date();
    const toast = useToast();
    const searchRef = useRef(null);
    const { bootmail,bootpass } = Authentication()

    const Attend = async (registerno) => {
        try {
            setShow(true)
            const responce = await axios.post(process.env.REACT_APP_database + "/attendstudent/" + registerno, {mail:bootmail, password: bootpass })
            if (responce?.data?.message) {
                toast({ title: registerno + " Attend", status: "success", position: "top", isClosable: true });
                fetchData();
            } else {
                toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true });
            }
        } catch (e) {
            console.log(e);
        }
    }

    const Absent = async (registerno) => {
        try {
            const responce1 = await axios.post(process.env.REACT_APP_database + "/absentstudent/" + registerno,{mail:bootmail, password: bootpass })
            if (responce1) {
                toast({ title: registerno + " Absent", status: "success", position: "top", isClosable: true });
                fetchData();
            } else {
                toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true });
            }
        } catch (e) {
            console.log(e);
        }
    }

    const Year = () => {
        sessionStorage.year = year;
        syear()
    }

    const fetchData = async () => {
        await axios.post(process.env.REACT_APP_database + "/bootcampstudents")
            .then((result) => {
                sdat(result.data.sort((a, b) => a.Year - b.Year));
            })
            .then(
                setIsLoading(false)
            )
            .catch((e) => console.log(e))
    }

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
    useEffect(() => {
        fetchData();
    }, [])

    const filteredData = dat.filter(user =>
        (user?.Reg_No?.toLowerCase().includes(select) ||
            user?.Reg_No?.toUpperCase().includes(select) ||
            user?.Name?.toUpperCase().includes(select) ||
            user?.Name?.toLowerCase().includes(select)) &&
        ((user?.Year && (user?.Year[0])) === sessionStorage.year)
    );

    return (
        <>
            {/* <FaceRegorg isOpen={show} onClose={() => setShow(false)} regd={regd} /> */}
            <BootcampNav />
            <div className="yearbtns">
                <Button className="yearbtnsink" style={{ backgroundColor: '#17D7A0', borderRadius: '10px', border: year === 1 ? "solid 3px black" : "white", }} onClick={Year} onClickCapture={(e) => { syear(1) }}><b>I B.Tech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#CCA8E9', borderRadius: '10px', border: year === 2 ? "solid 3px black" : "white" }} onClick={Year} onClickCapture={(e) => { syear(2) }}><b>II B.Tech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#A1EAFB', borderRadius: '10px', border: year === 3 ? "solid 3px black" : "white" }} onClick={Year} onClickCapture={(e) => { syear(3) }}><b>III B.Tech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#F185B3', borderRadius: '10px', border: year === 4 ? "solid 3px black" : "white" }} onClick={Year} onClickCapture={(e) => { syear(4) }}><b>IV B.Tech</b></Button>
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
                    {
                        isLoading ?
                            <tr>
                                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                                    <Spinner size="xl" />
                                </Box>  </tr> :
                            <Accordion allowToggle>
                                {filteredData.length > 0 ? filteredData.map((x, index) => (
                                    <AccordionItem key={index} style={{ display: 'flex', justifyContent: 'space-evenly' }} p={1} >
                                        <Box style={{ fontFamily: 'bold' }} flex="1" textAlign="left">
                                            {index + 1}. {x?.Name.toUpperCase()} ({x?.Reg_No.toUpperCase()})
                                        </Box>
                                        {x.Date !== date.toDateString() ?
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
}
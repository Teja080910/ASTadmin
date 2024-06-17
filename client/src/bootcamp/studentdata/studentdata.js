import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    HStack,
    Input,
    PinInput, PinInputField,
    Spinner,
    Text,
    useToast
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import './attendance.css';
export const BootAttendance = () => {
    const [dat, sdat] = useState([]);
    const [atnd, satnd] = useState([]);
    const [select, sselect] = useState([]);
    const [year, syear] = useState([]);
    const [otp, sotp] = useState([]);
    const [x, sx] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const date = new Date();
    const toast = useToast()
    const Attend = async () => {
        try {
            if (parseInt(otp)) {
                const responce = await axios.post(process.env.REACT_APP_database + "/student/" + atnd.Gmail)
                {
                    if (responce.data) {
                        console.log(responce.data)
                        if (x === 1) {
                            atnd.Num = (parseInt(responce.data.Num) + 1);
                            sx(2);
                            const responce1 = await axios.post(process.env.REACT_APP_database + "/loginstudent/" + atnd.Gmail + "/" + atnd.Num + "/" + date.toDateString())
                            {
                                if (responce1) {
                                    toast({ title: atnd.Reg_No + " Attend", status: "success", position: "top", isClosable: true })
                                    sotp(' ')
                                    document.getElementById('otps').style.display = 'none'
                                }
                                else {
                                    toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true })
                                }
                            }
                        }
                    }
                    else {
                        toast({ title: "Student not found", status: "error", position: "bottom-left", isClosable: true })
                    }
                }
            }
            else {
                toast({ title: "Invalid code", status: "error", position: "bottom-left", isClosable: true })
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const Send = async () => {
        document.getElementById('otps').style.display = 'block'
    }
    const Year = () => {
        sessionStorage.year = year;
    }
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/students")
            .then((result) => {
                sdat((result.data.sort((a, b) => a.Year - b.Year)));
            })
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [dat])
    return (
        <>
            <div className="otp" id='otps'>
                <HStack>
                    <PinInput type='alphanumeric' >
                        <PinInputField value={otp} onChange={(e) => { sotp(e.target.value) }} />
                        <PinInputField value={otp} onChange={(e) => { sotp(otp + e.target.value) }} />
                        <PinInputField value={otp} onChange={(e) => { sotp(otp + e.target.value) }} />
                        <PinInputField value={otp} onChange={(e) => { sotp(otp + e.target.value) }} />
                    </PinInput>
                </HStack>
                {/* <input type="number" align="center" placeholder="Enter OTP" onChange={(e) => { sotp(e.target.value) }}></input> */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={Attend}><b>Submit</b></button>
                    <Button style={{ backgroundColor: 'red' }} onClick={() => document.getElementById("otps").style.display = "none"}><b>X</b></Button>
                </div>
            </div>
            <div className="clgname">VEDIC VISION BOOTCAMP</div>
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
                                (user.Reg_No.toLowerCase().includes(select) ||
                                    user.Reg_No.toUpperCase().includes(select) ||
                                    user.Name.toUpperCase().includes(select) ||
                                    user.Name.toLowerCase().includes(select))
                                ).map((x, index) => (
                                    x.Year === sessionStorage.year &&
                                    <AccordionItem key={index}>
                                        <AccordionButton>
                                            <Box style={{ fontFamily: 'bold' }} flex="1" textAlign="left">
                                                {index + 1}. {x.Name.toUpperCase()} ({x.Reg_No.toUpperCase()})
                                            </Box>
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            <Text style={{ fontFamily: 'serif' }}>Register Number: {x.Reg_No.toUpperCase()}</Text>
                                            <Text style={{ fontFamily: 'serif' }}>Name: {x.Name.toUpperCase()}</Text>
                                            {x.Login !== date.toDateString() ?
                                                <Button colorScheme="blue" onClick={Send} onClickCapture={(e) => { satnd(x) }}>Attend</Button> :
                                                <Text >Already Attended</Text>}
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                    }
                </table>
            </div>
        </>
    )
}

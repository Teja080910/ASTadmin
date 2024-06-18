// import { HStack, PinInput, PinInputField, useToast } from "@chakra-ui/react";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/esm/Button";
// import './attendance.css'
// export const BootAttendance = () => {
//     const [dat, sdat] = useState([]);
//     const [atnd, satnd] = useState([]);
//     const [select, sselect] = useState([]);
//     const [year, syear] = useState([]);
//     const [otp, sotp] = useState([]);
//     const [x, sx] = useState(1);
//     const [isLoading, setIsLoading] = useState(true);
//     const date = new Date();
//     const toast = useToast()
//     const Attend = async () => {
//         try {
//             if (parseInt(otp)) {
//                 const responce = await axios.post(process.env.REACT_APP_database + "/student/" + atnd.Gmail)
//                 {
//                     if (responce.data) {
//                         console.log(responce.data)
//                         if (x === 1) {
//                             atnd.Num = (parseInt(responce.data.Num) + 1);
//                             sx(2);
//                             const responce1 = await axios.post(process.env.REACT_APP_database + "/loginstudent/" + atnd.Gmail + "/" + atnd.Num + "/" + date.toDateString())
//                             {
//                                 if (responce1) {
//                                     toast({ title: atnd.Reg_No + " Attend", status: "success", position: "top", isClosable: true })
//                                     sotp(' ')
//                                     document.getElementById('otps').style.display='none'
//                                 }
//                                 else {
//                                     toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true })
//                                 }
//                             }
//                         }
//                     }
//                     else {
//                         toast({ title: "Student not found", status: "error", position: "bottom-left", isClosable: true })
//                     }
//                 }
//             }
//             else {
//                 toast({ title: "Invalid code", status: "error", position: "bottom-left", isClosable: true })
//             }
//         }
//         catch (e) {
//             console.log(e);
//         }
//     }
//     const Send = async () => {
//         document.getElementById('otps').style.display='block'
//     }
//     const Year = () => {
//         sessionStorage.year = year;
//     }
//     useEffect(() => {
//         axios.post(process.env.REACT_APP_database + "/students")
//             .then((result) => {
//                 sdat((result.data.sort((a, b) => a.Year - b.Year)));
//             })
//         setTimeout(() => {
//             setIsLoading(false);
//         }, 2000);
//     }, [dat])
//     console.log(otp)
//     return (
//         <>
//             <div className="otp" id='otps'>
//                 <HStack>
//                     <PinInput type='alphanumeric' >
//                         <PinInputField value={otp} onChange={(e) => { sotp(e.target.value) }}/>
//                         <PinInputField value={otp} onChange={(e) => { sotp(otp+e.target.value) }}/>
//                         <PinInputField value={otp} onChange={(e) => { sotp(otp+e.target.value) }}/>
//                         <PinInputField value={otp} onChange={(e) => { sotp(otp+e.target.value) }}/>
//                     </PinInput>
//                 </HStack>
//                 {/* <input type="number" align="center" placeholder="Enter OTP" onChange={(e) => { sotp(e.target.value) }}></input> */}
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <button onClick={Attend}><b>Submit</b></button>
//                     <Button style={{ backgroundColor: 'red' }} onClick={() => document.getElementById("otps").style.display = "none"}><b>X</b></Button>
//                 </div>
//             </div>
//             <div className="clgname">VEDIC VISION BOOTCAMP</div>
//             <div className="yearbtns">
//                 <Button className="yearbtnsink" style={{backgroundColor: '#17D7A0',borderRadius:'10px',borderColor:'white'}}onClick={Year} onClickCapture={(e) => { syear(1) }}><b>I Btech</b></Button>
//                 <Button className="yearbtnsink" style={{ backgroundColor: '#CCA8E9',borderRadius:'10px' ,borderColor:'white'}} onClick={Year} onClickCapture={(e) => { syear(2) }}><b>II Btech</b></Button>
//                 <Button className="yearbtnsink" style={{ backgroundColor: '#A1EAFB' ,borderRadius:'10px',borderColor:'white'}} onClick={Year} onClickCapture={(e) => { syear(3) }}><b>III Btech</b></Button>
//                 <Button className="yearbtnsink" style={{ backgroundColor: '#F185B3',borderRadius:'10px',borderColor:'white' }} onClick={Year} onClickCapture={(e) => { syear(4) }}><b>IV Btech</b></Button>
//             </div>
//             <br />
//             <div>
//                 <input id='search' value={select} type="text" autoComplete="none" className="studentcheck" placeholder="Enter User mail or name" onChange={(e) => sselect(e.target.value)}></input>
//                 <table className="studetail">
//                     {
//                         isLoading ?
//                             <tr>
//                                 <td style={{ backgroundColor: 'white', textAlign: 'center' }} colSpan={5}>
//                                     <h5>Loading....</h5>
//                                 </td>
//                             </tr> :
//                             <>
//                                 <thead>
//                                     <tr>
//                                         <th>SNO</th>
//                                         <th>REGISTER NUMBER</th>
//                                         <th>NAME</th>
//                                         <th>CLICK</th>
//                                         <th></th>
//                                     </tr>
//                                 </thead>
//                                 {
//                                     dat.filter(user => (user.Reg_No).toLowerCase().includes(select) || (user.Reg_No).toUpperCase().includes(select) || (user.Name).toUpperCase().includes(select) || (user.Name).toLowerCase().includes(select)).map((x, index) => (
//                                         <>
//                                             <>
//                                                 <tr>
//                                                     {
//                                                         x.Year === sessionStorage.year &&
//                                                         <>
//                                                             <td style={{ height: '7vh' }}>{index + 1}</td>
//                                                             <td>{x.Reg_No.toUpperCase()}</td>
//                                                             <td>{x.Name.toUpperCase()}</td>
//                                                             <td>
//                                                                 {
//                                                                     x.Login !== date.toDateString() ?
//                                                                         <button style={{ backgroundColor: "#3498db", borderRadius: "8px", border: "none", color: "white", padding: "5px",fontFamily:'monospace' }} onClick={Send} onClickCapture={(e) => { satnd(x) }}><b>Attend</b></button> : <b></b>
//                                                                 }
//                                                             </td>
//                                                         </>
//                                                     }
//                                                 </tr>
//                                             </>
//                                         </>
//                                     ))}
//                             </>
//                     }
//                 </table>
//             </div>
//         </>
//     )
// }



import { HStack, PinInput, PinInputField, useToast, Card,Text,Box, Heading, Input, Spinner, Table, Thead, Tbody, Tr, Th, Td, Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,Button
    as ChakraButton } from "@chakra-ui/react";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { BootcampNav } from "../bootcampnav/bootcampnav";
import './attendance.css';
import './attendance.css'
export const BootAttendance = () => {
    const [dat, sdat] = useState([]);
    const [select, sselect] = useState([]);
    const [year, syear] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const date = new Date();
    const toast = useToast()
    const Attend = async (registerno) => {
        try {
            const responce = await axios.post(process.env.REACT_APP_database + "/attendstudent/" + registerno)
            {
                if (responce?.data?.message) {
                    toast({ title: registerno + " Attend", status: "success", position: "top", isClosable: true })
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
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/bootcampstudents")
            .then((result) => {
                sdat((result.data.sort((a, b) => a.Year - b.Year)));
            })
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [dat])
    return (
        <>
            <BootcampNav />
            <div className="yearbtns">
                <Button className="yearbtnsink" style={{backgroundColor: '#17D7A0',borderRadius:'10px',borderColor:'white'}}onClick={Year} onClickCapture={(e) => { syear(1) }}><b>I Btech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#CCA8E9',borderRadius:'10px' ,borderColor:'white'}} onClick={Year} onClickCapture={(e) => { syear(2) }}><b>II Btech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#A1EAFB' ,borderRadius:'10px',borderColor:'white'}} onClick={Year} onClickCapture={(e) => { syear(3) }}><b>III Btech</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: '#F185B3',borderRadius:'10px',borderColor:'white' }} onClick={Year} onClickCapture={(e) => { syear(4) }}><b>IV Btech</b></Button>
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
                        <Box style={{fontFamily:'bold'}}flex="1" textAlign="left">
                            {index + 1}. {x.Name.toUpperCase()} ({x.Reg_No.toUpperCase()})
                        </Box>
                        
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <Text style={{fontFamily:'serif'}}>Register Number: {x.Reg_No.toUpperCase()}</Text>
                        <Text style={{fontFamily:'serif'}}>Name: {x.Name.toUpperCase()}</Text>
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












{/* {
    isLoading ? 
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <Spinner size="xl" />
        </Box> :
        <Box display="flex" flexWrap="wrap" justifyContent="space-around">
            {dat.filter(user => 
                (user.Reg_No.toLowerCase().includes(select) || 
                user.Reg_No.toUpperCase().includes(select) || 
                user.Name.toUpperCase().includes(select) || 
                user.Name.toLowerCase().includes(select))
            ).map((x, index) => (
                x.Year === sessionStorage.year && 
                <Card key={index} width="300px" m="10px" p="20px" borderRadius="8px" boxShadow="lg">
                    <Box fontWeight="bold" mb="10px">#{index + 1}</Box>
                    <Box mb="10px">Register Number: {x.Reg_No.toUpperCase()}</Box>
                    <Box mb="10px">Name: {x.Name.toUpperCase()}</Box>
                    <Box>
                        {x.Login !== date.toDateString() ? 
                            <Button colorScheme="blue" onClick={Send} onClickCapture={(e) => { satnd(x) }}>Attend</Button> : 
                            <Text>Already Attended</Text>}
                    </Box>
                </Card>
            ))}
        </Box>
} */}


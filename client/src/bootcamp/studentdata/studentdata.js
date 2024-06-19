import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Input,
    Spinner,
    Text,
    useToast
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import '../attendance/attendance.css';
import { BootcampNav } from "../bootcampnav/bootcampnav";
import { UploadModel } from "./uploadmodel";
import { StudentUpdateModel } from "./studentupdatemodel";
export const StudentsData = () => {
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [dat, sdat] = useState([]);
    const [data,setData]=useState();
    const [select, sselect] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const date = new Date();
    const toast = useToast()
    
    const Attend = async (data) => {
        try {

            // const responce1 = await axios.post(process.env.REACT_APP_database + "/loginstudent/")
            // {
            //     if (responce1) {
            //         toast({ title: + " Attend", status: "success", position: "top", isClosable: true })
            //     }
            //     else {
            //         toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true })
            //     }
            // }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/bootcampstudents")
            .then((result) => {
                sdat((result.data.sort((a, b) => a.Year - b.Year)));
            }).catch((e) => console.log(e))
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [dat])
    return (
        <>
            <BootcampNav />
            <UploadModel isOpen={open} onClose={() => setOpen(false)} />
            <StudentUpdateModel show={show} close={() => setShow(false)} data={data} />;
            <div style={{ width: "100%", display: "flex", justifyContent: "right", padding: "5%" }}>
                <Button style={{ backgroundColor: "black", color: 'white' }} onClick={() => setOpen(true)}>Upload File</Button>
            </div>
            <div>
                <Box display="flex" justifyContent="center" mb={6}>
                    <Input id="search" value={select} placeholder="Enter User mail or name" onChange={(e) => sselect(e.target.value)} width="50%" />
                </Box>
                <table className="studetail">
                    {
                        isLoading ?
                            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                                <Spinner size="xl" />Loading
                            </Box> :
                            <Accordion allowToggle>
                                {dat.filter(user =>
                                (user?.Reg_No?.toLowerCase().includes(select) ||
                                    user?.Reg_No?.toUpperCase().includes(select) ||
                                    user?.Name?.toUpperCase().includes(select) ||
                                    user?.Name?.toLowerCase().includes(select))
                                ).map((x, index) => (
                                    <AccordionItem key={index}>
                                        <AccordionButton>
                                            <Box style={{ fontFamily: 'bold' }} flex="1" textAlign="left">
                                                {index + 1}. {x.Name.toUpperCase()} ({x.Reg_No.toUpperCase()})
                                            </Box>
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            <Text style={{ fontFamily: 'serif' }}>Register Number: {x.Reg_No.toUpperCase()}</Text>
                                            <Text style={{ fontFamily: 'serif' }}>Name: {x.Name.toUpperCase()}</Text>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <Button colorScheme="blue" onClick={() =>{setData(x);setShow(true)}}>Update</Button>
                                                <Button colorScheme="red" onClick={()=>(x)}>Remove</Button>
                                            </div>
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

import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Input,
    Spinner,
    Text,
    useToast
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../attendance/attendance.css';
import { StudentUpdateModel } from "./studentupdatemodel";
import { UploadModel } from "./uploadmodel";
export const StudentsData = () => {
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [dat, sdat] = useState([]);
    const [data, setData] = useState();
    const [select, sselect] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast()

    const Remove = async (student) => {
        try {
            const responce = await axios.post(process.env.REACT_APP_database + "/deletestudent",{student})
            {
                if (responce.data) {
                    toast({ title:"Delete Sucessfully", status: "success", position: "top", isClosable: true })
                    setTimeout(() => {
                        window.location.reload(3)
                    }, 1000);
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

    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/bootcampstudents")
            .then((result) => {
                sdat((result.data.sort((a, b) => a.Year - b.Year)));
            }).catch((e) => console.log(e))
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [])
    return (
        <>
            {/* <BootcampNav /> */}
            <UploadModel isOpen={open} onClose={() => setOpen(false)} />
            <StudentUpdateModel show={show} close={() => setShow(false)} data={data} />;
            <div style={{ width: "100%", display: "flex", justifyContent: "right", padding: "5%" }}>
                <Button style={{ backgroundColor: "black", color: 'white' }} onClick={() => setOpen(true)}>Upload File</Button>
            </div>
            <div className="studentdata">
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
                                                {index + 1}. {x?.Name?.toUpperCase()} ({x?.Reg_No?.toUpperCase()})
                                            </Box>
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            <Text style={{ fontFamily: 'serif' }}>Register Number: {x?.Reg_No?.toUpperCase()}</Text>
                                            <Text style={{ fontFamily: 'serif' }}>Name: {x?.Name?.toUpperCase()}</Text>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <Button colorScheme="blue" onClick={() => { setData(x); setShow(true) }}>Update</Button>
                                                <Button colorScheme="red" onClick={() => (Remove(x?.Reg_No))}>Remove</Button>
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

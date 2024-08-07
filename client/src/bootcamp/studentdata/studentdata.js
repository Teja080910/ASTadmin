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
import React, { useEffect, useRef, useState } from "react";
import '../attendance/attendance.css';
import { UploadModel } from "./uploadmodel";
import { StudentUpdateModal } from "./studentupdatemodel";
import { students } from "../../actions/api";
export const StudentsData = () => {
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [deletes, setDelete] = useState(false)
    const [dat, sdat] = useState([]);
    const [data, setData] = useState();
    const [select, sselect] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast()
    const searchRef = useRef(null)

    const Remove = async (student) => {
        try {
            const responce = await axios.post(process.env.REACT_APP_database + "/deletestudent", { student })
            {
                if (responce.data) {
                    toast({ title: "Delete Sucessfully", status: "success", position: "top", isClosable: true })
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

    const RemoveAll = async () => {
        try {
            const responce = await axios.post(process.env.REACT_APP_database + "/deletestudents")
            {
                if (responce.data) {
                    toast({ title: "Delete Sucessfully", status: "success", position: "top", isClosable: true })
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
        axios.post(students + "/bootcampstudents")
            .then((result) => {
                sdat((result.data.sort((a, b) => a.Year - b.Year)));
                setIsLoading(false);
            }).catch((e) => {
                console.log(e)
                setIsLoading(false);
            })
    }, [])



    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key.toLowerCase() === 'f' && event.shiftKey) {
                event.preventDefault();
                searchRef.current.focus();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
    return (
        <>
            {/* <BootcampNav /> */}
            <UploadModel isOpen={open} onClose={() => setOpen(false)} />
            <StudentUpdateModal show={show} close={() => setShow(false)} data={data} />
            <Box display="flex" justifyContent="space-evenly" mb={6} >
                <Input id="search" value={select} placeholder="Enter User mail or name" ref={searchRef} onChange={(e) => sselect(e.target.value)} width="50%" />
                <Button style={{ backgroundColor: "black", color: 'white' }} onClick={() => setOpen(true)}>Upload File</Button>

            </Box>

            <div className="studentdata">

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

                <div style={{ width: "100%", display: "flex", justifyContent: "left", padding: "5%" }}>
                    {!deletes ? <Button style={{ backgroundColor: 'orangered', color: 'white' }} onClick={() => setDelete(true)}>Delete All </Button> :
                        <div style={{ display: 'inline-flex', justifyContent: 'space-evenly', width: '20%' }}>
                            <Button style={{ backgroundColor: 'yellowgreen', color: 'white' }} onClick={RemoveAll}>Confirm Delete</Button>
                            <Button style={{ backgroundColor: 'orange', color: 'white' }} onClick={() => setDelete(false)}>No</Button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, SimpleGrid, Table, TableContainer, Tbody, Td, Tr, useToast } from '@chakra-ui/react';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
export const PastAttendance = () => {
    const [data, setData] = useState()
    const [load, sload] = useState(false)
    const [start, setStart] = useState(0);
    const size = 10;
    const initialFocusRef = React.useRef()
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/attendance")
            .then((result) => {
                setData(result.data.sort((a, b) => b.Date - a.Date));
                console.log(data)
                sload(true)
            }).catch((e) => console.log(e))
    }, [])
    
    
    useEffect(() => {
        if (start > data?.length) {
            setStart(0)
        }
        if (start < 0) {
            setStart(size)
        }
    })
    return (
        <div style={{ marginBottom: "10%" }}>
            <h5 style={{ color: "red", display: "flex", justifyContent: "center" }}>{load || "Loading....."}</h5>
            <SimpleGrid columns={{ base: 1, md: 5 }} width="100%" spacingX='40px' spacingY='20px'>
                {
                    data?.slice(start, start + size).map((val) => (
                        <Popover
                            initialFocusRef={initialFocusRef}
                            placement='bottom'
                            closeOnBlur={false}
                        >
                            <PopoverTrigger>
                                <Button>{val.Date}</Button>
                            </PopoverTrigger>
                            <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                                    {val.Date} th Attendace
                                </PopoverHeader>
                                <PopoverArrow bg='blue.800' />
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <TableContainer>
                                        <Table size='sm'>
                                            <Tbody>
                                                {
                                                    val?.Data?.map((val,index) => (
                                                        <Tr key={index}>
                                                            <Td>{index+1}</Td>
                                                            <Td>{val.Gmail}</Td>
                                                        </Tr>
                                                    ))
                                                }
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    ))
                }
            </SimpleGrid>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "0 5%" }}>
                <Button variant='outline' onClick={() => setStart(start - size)}>Previous...</Button>
                <Button variant='outline' onClick={() => setStart(start + size)}>Next...</Button>
            </div>
        </div>
    )
}
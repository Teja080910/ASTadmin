import axios from "axios";
import { useEffect, useState } from "react";
import { TableContainer, Tr, Th, Td, Tfoot, Table, TableCaption, Thead, Tbody } from "@chakra-ui/react";
export const FiveStreak = () => {
    const [dat, sdat] = useState([]);
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/students")
            .then((result) => {
                sdat((result.data.sort((a, b) => b.Num - a.Num)));
            })
            .catch((e) => console.log(e))
    }, [])
    return (
        <div style={{display:"flex",justifyContent:"space-around"}}>
            <div>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Th style={{ color: "blueviolet", textAlign: 'center' }} colSpan={3}>Technology Attendance</Th>
                        </Thead>
                        <Tbody>
                            {
                                dat.slice(0, 5).map((x, index) => (
                                    <Tr>
                                        <Td >{index + 1}</Td>
                                        <Td>{x.Reg_No}</Td>
                                        <Td><b>{x.Name}</b></Td>
                                        <Td>{x.Branch}</Td>
                                        <Td>{x.Year}</Td>
                                        <Td>
                                            <div style={{ position: "relative" }}>
                                                <img src={"streak.png"} alt="streak"></img>
                                                <div class="streak-text"><b >{parseInt(x.Num)}</b></div>
                                            </div>
                                        </Td>
                                    </Tr>

                                ))
                            }
                        </Tbody>
                        <TableCaption>
                            <Tr>
                                <Th colSpan={3}>Top Five Members In Attendance Streaks</Th>
                            </Tr>
                        </TableCaption>
                    </Table>
                </TableContainer>
            </div>

            <div>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Th style={{ color: "blueviolet", textAlign: 'center' }} colSpan={3}>Sadhana Attendance</Th>
                        </Thead>
                        <Tbody>
                            {
                                dat.slice(0, 5).map((x, index) => (
                                    <Tr>
                                        <Td >{index + 1}</Td>
                                        <Td>{x.Reg_No}</Td>
                                        <Td><b>{x.Name}</b></Td>
                                        <Td>{x.Branch}</Td>
                                        <Td>{x.Year}</Td>
                                        <Td>
                                            <div style={{ position: "relative" }}>
                                                <img src={"streak.png"} alt="streak"></img>
                                                <div class="streak-text"><b >{parseInt(x.MrngStreak)}</b></div>
                                            </div>
                                        </Td>
                                    </Tr>

                                ))
                            }
                        </Tbody>
                        <TableCaption>
                            <Tr>
                                <Th colSpan={3}>Top Five Members In Sadhana Streaks</Th>
                            </Tr>
                        </TableCaption>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
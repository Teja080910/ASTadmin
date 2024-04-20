import { SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import streakImg from './streak.png'
export const FiveStreak = ({ data }) => {
    return (
        <div className="fivestreak">
            <SimpleGrid className="streakgrid" spacing={{ base: 4, md: 100 }} templateColumns={{ base: '1fr', md: 'repeat(auto-fill, minmax(500px, 1fr))' }}>
                <TableContainer >
                    <Table variant='simple' style={{fontSize:"10px"}}>
                        <Thead>
                            <Th style={{ color: "blueviolet", textAlign: 'center' }} colSpan={3}>Technology Attendance</Th>
                        </Thead>
                        <Tbody>
                            {
                                data.sort((a, b) => b.Num - a.Num).slice(0, 5).map((x, index) => (
                                    <Tr >
                                        <Td>{x.Reg_No}</Td>
                                        <Td ><b>{x.Name}</b></Td>
                                        <Td>{x.Branch}</Td>
                                        <Td>{x.Year}</Td>
                                        <Td>
                                            <div style={{ position: "relative" }}>
                                                <img src={streakImg} alt="streak"></img>
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
                <TableContainer>
                    <Table variant='simple' style={{fontSize:"10px"}}>
                        <Thead>
                            <Th style={{ color: "blueviolet", textAlign: 'center' }} colSpan={3}>Sadhana Attendance</Th>
                        </Thead>
                        <Tbody>
                            {
                                data.sort((a, b) => b.MrngStreak - a.MrngStreak).slice(0, 5).map((x, index) => (
                                    <Tr>
                                        <Td>{x.Reg_No}</Td>
                                        <Td><b>{x.Name}</b></Td>
                                        <Td>{x.Branch}</Td>
                                        <Td>{x.Year}</Td>
                                        <Td>
                                            <div style={{ position: "relative" }}>
                                                <img src={"streak.png"} alt="streak"></img>
                                                <div className="streak-text"><b >{parseInt(x.MrngStreak)}</b></div>
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
            </SimpleGrid>
        </div>
    )
}
import { Box, SimpleGrid, Table, TableCaption, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";

export const FiveStreak = ({ data }) => {
    const sortedByTechnologyAttendance = [...data].sort((a, b) => b.Num - a.Num).slice(0, 5);
    const sortedBySadhanaAttendance = [...data].sort((a, b) => b.MrngStreak - a.MrngStreak).slice(0, 5);

    return (
        <Box className="fivestreak">
            <SimpleGrid className="streakgrid" spacing={{ base: 4, md: 10 }} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
                <Box borderWidth="1px" borderRadius="lg" overflow="auto" p={4} shadow="md">
                    <Text style={{ color: "blueviolet", textAlign: 'center' }} fontSize="xl" fontWeight="bold" mb={4}>Technology Attendance</Text>
                    <Table variant='simple' size="sm">
                        <Thead>
                            <Tr>
                                <Th>Reg No</Th>
                                <Th>Name</Th>
                                <Th>Branch</Th>
                                <Th>Year</Th>
                                <Th>Streak</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {sortedByTechnologyAttendance.map((x, index) => (
                                <Tr key={index}>
                                    <Td>{x.Reg_No}</Td>
                                    <Td><b>{x.Name}</b></Td>
                                    <Td>{x.Branch}</Td>
                                    <Td>{x.Year}</Td>
                                    <Td>
                                     
                                            <div className="main-streak-text"><b>{parseInt(x.Num)}</b></div>
                                     
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <TableCaption>Top Five Members In Technology Attendance Streaks</TableCaption>
                    </Table>
                </Box>
                <Box borderWidth="1px" borderRadius="lg" overflow="auto" p={4} shadow="md"  >
                    <Text style={{ color: "blueviolet", textAlign: 'center' }} fontSize="xl" fontWeight="bold" mb={4}>Sadhana Attendance</Text>
                    <Table variant='simple' size="sm">
                        <Thead>
                            <Tr>
                                <Th>Reg No</Th>
                                <Th>Name</Th>
                                <Th>Branch</Th>
                                <Th>Year</Th>
                                <Th>Streak</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {sortedBySadhanaAttendance.map((x, index) => (
                                <Tr key={index}>
                                    <Td>{x.Reg_No}</Td>
                                    <Td><b>{x.Name}</b></Td>
                                    <Td>{x.Branch}</Td>
                                    <Td>{x.Year}</Td>
                                    <Td>
                                     
                                            <div className="main-streak-text"><b>{parseInt(x.MrngStreak)}</b></div>
                                 
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <TableCaption>Top Five Members In Sadhana Attendance Streaks</TableCaption>
                    </Table>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default FiveStreak;

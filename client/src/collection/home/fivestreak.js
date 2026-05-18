import { Box, SimpleGrid, Text, Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react";

export const FiveStreak = ({ data }) => {
    const sortedByTechnologyAttendance = [...data].sort((a, b) => b.Num - a.Num).slice(0, 5);
    const sortedBySadhanaAttendance = [...data].sort((a, b) => b.MrngStreak - a.MrngStreak).slice(0, 5);

    return (
        <Box className="fivestreak">
            <SimpleGrid className="streakgrid" spacing={{ base: 4, md: 8 }} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
                <Box bg="white" borderRadius="xl" border="1px solid" borderColor="surface.100" boxShadow="card" overflow="hidden">
                    <Box bg="brand.50" px={5} py={3} borderBottom="1px solid" borderColor="surface.100">
                        <Text color="brand.700" fontSize="md" fontWeight={700}>Technology Attendance</Text>
                    </Box>
                    <Box overflowX="auto" p={4}>
                        <Table variant="simple" size="sm">
                            <Thead>
                                <Tr>
                                    <Th color="surface.500" fontSize="2xs">Reg No</Th>
                                    <Th color="surface.500" fontSize="2xs">Name</Th>
                                    <Th color="surface.500" fontSize="2xs">Branch</Th>
                                    <Th color="surface.500" fontSize="2xs">Year</Th>
                                    <Th color="surface.500" fontSize="2xs" textAlign="center">Streak</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {sortedByTechnologyAttendance.map((x, index) => (
                                    <Tr key={index} _hover={{ bg: 'surface.50' }}>
                                        <Td fontWeight={500} fontSize="sm">{x.Reg_No}</Td>
                                        <Td fontWeight={600} fontSize="sm">{x.Name}</Td>
                                        <Td fontSize="sm">{x.Branch}</Td>
                                        <Td fontSize="sm">
                                            <Badge colorScheme="brand" variant="subtle" borderRadius="full">{x.Year}</Badge>
                                        </Td>
                                        <Td textAlign="center">
                                            <Box className="main-streak-text">
                                                <Text className="streak-value">{parseInt(x.Num)}</Text>
                                            </Box>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
                <Box bg="white" borderRadius="xl" border="1px solid" borderColor="surface.100" boxShadow="card" overflow="hidden">
                    <Box bg="accent.50" px={5} py={3} borderBottom="1px solid" borderColor="surface.100">
                        <Text color="accent.700" fontSize="md" fontWeight={700}>Sadhana Attendance</Text>
                    </Box>
                    <Box overflowX="auto" p={4}>
                        <Table variant="simple" size="sm">
                            <Thead>
                                <Tr>
                                    <Th color="surface.500" fontSize="2xs">Reg No</Th>
                                    <Th color="surface.500" fontSize="2xs">Name</Th>
                                    <Th color="surface.500" fontSize="2xs">Branch</Th>
                                    <Th color="surface.500" fontSize="2xs">Year</Th>
                                    <Th color="surface.500" fontSize="2xs" textAlign="center">Streak</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {sortedBySadhanaAttendance.map((x, index) => (
                                    <Tr key={index} _hover={{ bg: 'surface.50' }}>
                                        <Td fontWeight={500} fontSize="sm">{x.Reg_No}</Td>
                                        <Td fontWeight={600} fontSize="sm">{x.Name}</Td>
                                        <Td fontSize="sm">{x.Branch}</Td>
                                        <Td fontSize="sm">
                                            <Badge colorScheme="accent" variant="subtle" borderRadius="full">{x.Year}</Badge>
                                        </Td>
                                        <Td textAlign="center">
                                            <Box className="main-streak-text">
                                                <Text className="streak-value">{parseInt(x.MrngStreak)}</Text>
                                            </Box>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default FiveStreak;

import { useEffect, useState } from "react"
import { Box, Flex, Heading, Text, Grid, VStack, Container } from "@chakra-ui/react"
import { Modules } from "./modules"

export const BootcampHome = () => {
    const [attendance, setAttendance] = useState([])
    const [score, setScore] = useState([])
    const [overall, setOverall] = useState([])

    const Overall = async () => {
        const attendData = await Modules.Attendance()
        setAttendance(attendData)
        const scoreData = await Modules.Score()
        setScore(scoreData)
        const overallData = await Modules.Overall()
        setOverall(overallData)
    }

    useEffect(() => {
        Overall()
    }, [])

    return (
        <Container maxW="container.xl" py={10} zIndex={-1}>
            <Heading textAlign="center" mb={10} className="animate__animated animate__swing">Top Members</Heading>
            <Grid templateColumns={{ base: "repeat(auto-fit, minmax(200px, 1fr))", md: "repeat(auto-fit, minmax(400px, 1fr))" }} gap={6}>
                <Box className="animate__animated animate__jello" bg="white" p={5} shadow="md" borderRadius="md">
                    <Heading size="md" mb={4}>Overall</Heading>
                    <VStack spacing={2}>
                        {
                            overall?.slice(0, 8)?.map((student, index) => (
                                <Flex key={index} justify="space-between" w="100%">
                                    <Text fontFamily="monospace">{student?.Name?.toUpperCase()}</Text>
                                    <Text fontFamily="monospace">{student?.Total}</Text>
                                </Flex>
                            ))
                        }
                    </VStack>
                </Box>
                <Box>


                    <Box className="animate__animated animate__jello" bg="white" p={5} shadow="md" borderRadius="md">
                        <Heading size="md" mb={4}>Highest Attendance</Heading>
                        <VStack spacing={2}>
                            {
                                attendance?.slice(0, 3)?.map((student, index) => (
                                    <Flex key={index} justify="space-between" w="100%">
                                        <Text fontFamily="monospace">{student?.Name?.toUpperCase()}</Text>
                                        <Text fontFamily="monospace">{student?.AttendDays}</Text>
                                    </Flex>
                                ))
                            }
                        </VStack>
                    </Box>

                    <Box className="animate__animated animate__jello" bg="white" p={5} mt={10} shadow="md" borderRadius="md">
                        <Heading size="md" mb={4}>Highest Score</Heading>
                        <VStack spacing={2}>
                            {
                                score?.slice(0, 3)?.map((student, index) => (
                                    <Flex key={index} justify="space-between" w="100%">
                                        <Text fontFamily="monospace">{student?.Name?.toUpperCase()}</Text>
                                        <Text fontFamily="monospace">{student?.Marks}</Text>
                                    </Flex>
                                ))
                            }
                        </VStack>
                    </Box>
                </Box>
                <Box className="animate__animated animate__jello" bg="white" p={5} shadow="md" borderRadius="md">
                    <Heading size="md" mb={4}>Activities</Heading>
                    <Text fontFamily="monospace">Name - </Text>
                </Box>

                <Box className="animate__animated animate__jello" bg="white" p={5} shadow="md" borderRadius="md">
                    <Heading size="md" mb={4}>Internal Marks</Heading>
                    <Text fontFamily="monospace">Name - </Text>
                </Box>
            </Grid>
        </Container>
    )
}

import { useEffect, useState } from "react"
import { Box, Flex, Heading, Text, Grid, VStack, Container, Tr, Td, Table, Icon, Button } from "@chakra-ui/react"
import { Modules } from "./modules"
import { LockIcon } from "@chakra-ui/icons"

export const HackathonHome = () => {
    const [display, setDisplay] = useState(false)
    const [score, setScore] = useState([])
    const [overall, setOverall] = useState([])
    const [internal, setInternal] = useState([])
    const [activity, setActivity] = useState([])

    const Overall = async () => {
        const scoreData = await Modules.Score()
        setScore(scoreData)
        const overallData = await Modules.Overall()
        setOverall(overallData)
        const internalData = await Modules.Internals()
        setInternal(internalData)
        const activityData = await Modules.Activities()
        setActivity(activityData)
    }

    useEffect(() => {
        Overall()
    }, [])

    return (
        <Container maxW="container.xl" py={10} zIndex={-1} >
            <Heading textAlign="center" mb={10} className="animate__animated animate__swing">Top Members   <Button onClick={()=>setDisplay(!display)}>
            <LockIcon/>
            </Button> </Heading>
          
           { display && <Grid templateColumns={{ base: "repeat(auto-fit, minmax(200px, 1fr))", md: "repeat(auto-fit, minmax(375px, 1fr))", xl: "repeat(auto-fit, minmax(420px, 1fr))", }} gap={6} >
                <Box className="animate__animated animate__jello" bg="white" p={5} shadow="md" borderRadius="md">
                    <Heading size="md" mb={4}>Overall</Heading>
                    <Table spacing={2}>
                        {
                            overall?.slice(0, 15)?.map((student, index) => (
                                <Tr>
                                    <Td>
                                        <Text fontFamily="monospace">{student?.Name?.toUpperCase() || "not found"}</Text>
                                    </Td>
                                    <Td>
                                        <Text fontFamily="monospace">{student?.Code}</Text>
                                    </Td>
                                    <Td>
                                        <Text fontFamily="monospace">{student?.Total}</Text>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Table>
                </Box>
                <Box>
                    <Box className="animate__animated animate__jello" bg="white" p={5} mt={10} shadow="md" borderRadius="md">
                        <Heading size="md" mb={4}>Highest Score</Heading>
                        <Table spacing={2}>
                            {
                                score?.slice(0, 3)?.map((student, index) => (
                                    <Tr>
                                        <Td>
                                            <Text fontFamily="monospace">{student?.Name?.toUpperCase() || "not found"}</Text>
                                        </Td>
                                        <Td>
                                            <Text fontFamily="monospace">{student?.Code}</Text>
                                        </Td>
                                        <Td>
                                            <Text fontFamily="monospace">{student?.Marks}</Text>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Table>
                    </Box>

                    <Box className="animate__animated animate__jello" bg="white" p={5} shadow="md" borderRadius="md">
                        <Heading size="md" mb={4}>Activities</Heading>
                        <Table spacing={2}>
                            {
                                activity?.slice(0, 3)?.map((student, index) => (
                                    <Tr>
                                        <Td>
                                            <Text fontFamily="monospace">{student?.Team?.toUpperCase() || "not found"}</Text>
                                        </Td>
                                        <Td>
                                            <Text fontFamily="monospace">{student?.TeamCode}</Text>
                                        </Td>
                                        <Td>
                                            <Text fontFamily="monospace">{student?.HackActivityMarks}</Text>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Table>
                    </Box>

                    <Box className="animate__animated animate__jello" bg="white" p={5} shadow="md" borderRadius="md">
                        <Heading size="md" mb={4}>Internal Marks</Heading>
                        <Table spacing={2}>
                            {
                                internal?.slice(0, 3)?.map((student, index) => (
                                    <Tr>
                                        <Td>
                                            <Text fontFamily="monospace">{student?.Team?.toUpperCase() || "not found"}</Text>
                                        </Td>
                                        <Td>
                                            <Text fontFamily="monospace">{student?.TeamCode}</Text>
                                        </Td>
                                        <Td>
                                            <Text fontFamily="monospace">{student?.HackInternalMarks}</Text>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Table>
                    </Box>
                </Box>
            </Grid>}
        </Container>
    )
}

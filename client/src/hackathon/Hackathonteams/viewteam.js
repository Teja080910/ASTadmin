import { Button, Card, CardBody, CardHeader, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Table, Td, Text, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Actions } from "../../actions/actions"

export const TeamView = ({ data, show, close }) => {
    const [team, setTeam] = useState([])
    const Teams = async () => {
        await Actions.Students()
            .then((res) => setTeam(res?.data))
            .catch((e) => console.log(e))
    }

    const filterData = team?.filter(member => data && data?.includes(member?.Reg_No?.trim()))

    useEffect(() => {
        Teams()
    }, [])
    
    return (
        <Modal onClose={close} size={"50%"} isOpen={show}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader align="center">Team Members Data</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                        {
                            filterData?.map((student) => (
                                <Card key={student?.Reg_No} p={0}>
                                    <CardHeader m={0} p={1} textAlign="center">
                                        <Heading size='sm' as="p" noOfLines={1} color="purple">{student?.Name?.toUpperCase()}</Heading>
                                    </CardHeader>
                                    <CardBody p={0} m={0}>
                                        <Table variant="simple" >
                                            <Tr>
                                                <Td>Register Number </Td>
                                                <Td>{student?.Reg_No}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Year </Td>
                                                <Td>{student?.Year}/4</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Branch </Td>
                                                <Td>{student?.Branch}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Section </Td>
                                                <Td>{student?.Section}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Mobile Number </Td>
                                                <Td>{student?.Number}</Td>
                                            </Tr>
                                        </Table>
                                    </CardBody>
                                </Card>
                            ))
                        }
                    </SimpleGrid>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={close}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

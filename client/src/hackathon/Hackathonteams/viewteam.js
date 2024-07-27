import { Button, Card, CardBody, CardHeader, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Actions } from "../../actions/actions"

export const TeamView = ({ data, show, close }) => {
    const [team, setTeam] = useState([])
    const Teams = async () => {
        await Actions.Students()
            .then((res) => setTeam(res?.data))
            .catch((e) => console.log(e))
    }

    const filterData = team.filter(member => data?.includes(member?.Reg_No?.trim()))

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
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                        {
                            filterData?.map((student) => (
                                <Card>
                                    <CardHeader>
                                        <Heading size='sm'>{student?.Name}</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>{student?.Reg_No}</Text>
                                        <Text>{student?.Year} year</Text>
                                        <Text>{student?.Branch}</Text>
                                        <Text>{student?.Section}</Text>
                                        <Text>{student?.Number}</Text>
                                    </CardBody>
                                    {/* <CardFooter>
                                        <Button>View here</Button>
                                    </CardFooter> */}
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
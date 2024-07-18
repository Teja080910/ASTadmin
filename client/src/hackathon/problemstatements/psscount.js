import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Input, Table, Td, Text, Tr, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Actions } from "../../actions/actions"
export const CountProblemStatement = ({ show, hide }) => {
    const [count, setCount] = useState({
        members: '',
        statements: '',
        load: false
    })
    const toast = useToast()
    const [data, setData] = useState([])

    const submitCount = async () => {
        setCount((state) => ({ ...state, load: true }))
        count.members = count?.members || data?.Members
        count.statements = count?.statements || data?.Statements
        await Actions.PssCount(count)
            .then((res) => {
                if (res?.data?.message) {
                    setCount((state) => ({ ...state, load: false }))
                    toast({ title: res?.data?.message, status: "success", position: "top-right", isClosable: true });
                } else {
                    setCount((state) => ({ ...state, load: false }))
                    toast({ title: res?.data?.erroe, status: "error", position: "bottom-right", isClosable: true });
                }
            }).catch((e) => {
                console.log(e)
                setCount((state) => ({ ...state, load: false }))
            })
    }

    const Count = async () => {
        await Actions.PSSC()
            .then((res) => setData(res?.data?.data)).catch((e) => console.log(e))
    }

    useEffect(() => {
        Count()
    }, [])

    return (
        <div>
            <Button colorScheme={show ? 'red' : "blue"} onClick={() => hide()}>{!show ? "show" : "Hide"}</Button>
            {show && <Card align='center'>
                <CardHeader>
                    <Heading size="lg" >Enter required details</Heading>
                </CardHeader>
                <CardBody>
                    <Table>
                        <Tr>
                            <Td>
                                <Text>No of participants</Text>
                            </Td>
                            <Td>
                                <Input type="number" placeholder={"Enter number of members"} value={count?.members || data?.Members} autoFocus onChange={(e) => setCount((state) => ({ ...state, members: e.target.value }))} />
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Text>No of Problem Statements</Text>
                            </Td>
                            <Td>
                                <Input type="number" placeholder={"Enter number of statements"} value={count?.statements || data?.Statements} onChange={(e) => setCount((state) => ({ ...state, statements: e.target.value }))} />
                            </Td>
                        </Tr>
                    </Table>
                </CardBody>
                <CardFooter>
                    <Button colorScheme='blue' onClick={() => submitCount()}>{count?.load ? "Submitting..." : "Submit"}</Button>
                </CardFooter>
            </Card>}
        </div>
    )
}
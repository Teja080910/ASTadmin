import { DeleteIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Flex, Heading, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { Actions } from "../../actions/actions";
import { useToast } from "@chakra-ui/react";

export const SearchData = ({ filteredData, refesh }) => {
    const [marks, setMarks] = useState({});
    const toast = useToast();

    const GivenMarks = async (user, marks, total, dayindex, taskindex) => {
        if (marks <= parseInt(total)) {
            await Actions.Givenmarks(user, marks, dayindex, taskindex)
                .then((res) => {
                    if (res?.data) {
                        refesh();
                        toast({
                            title: res?.data?.message,
                            status: "success",
                            position: "top-right",
                            isClosable: true,
                        });
                    } else {
                        toast({
                            title: res?.data?.error,
                            status: "error",
                            position: "bottom-right",
                            isClosable: true,
                        });
                    }
                })
                .catch((e) => {
                    toast({
                        title: e?.message,
                        status: "error",
                        position: "bottom-right",
                        isClosable: true,
                    });
                });
        } else {
            toast({
                title: "Marks error",
                status: "warning",
                position: "bottom-right",
                isClosable: true,
            });
        }
    };

    const RemoveTask = async (user, marks, dayindex, taskindex) => {
        await Actions.RemoveTask(user, marks, dayindex, taskindex)
            .then((res) => {
                if (res?.data) {
                    refesh()
                    toast({
                        title: res?.data?.message,
                        status: "success",
                        position: "top-right",
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: res?.data?.error,
                        status: "error",
                        position: "bottom-right",
                        isClosable: true,
                    });
                }
            })
            .catch((e) => {
                toast({
                    title: e?.message,
                    status: "error",
                    position: "bottom-right",
                    isClosable: true,
                });
            });
    };
    return (
        <Flex flexDirection="column" alignItems="center">
            {filteredData?.map(
                (x, index) =>
                    x?.Tasks && (
                        <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="auto"
                            shadow="lg"
                            m={4}
                            p={4}
                            width="100%"
                            maxW="xxl"
                        >
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                                mb={4}
                            >
                                <Heading as="h2" size="md" mb={4}>
                                    {x?.Name?.toUpperCase()}
                                </Heading>

                                <Badge colorScheme="blue">{x?.Year} B.Tech</Badge>
                            </Flex>
                            <Table variant="simple" colorScheme="gray">
                                <Thead>
                                    <Tr>
                                        <Th>Day</Th>
                                        <Th>Task No</Th>
                                        <Th>Task</Th>
                                        <Th>Score</Th>
                                        <Th>Max Marks</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {Object.keys(x?.Tasks || {})?.map((key, dayindex) =>
                                        x?.Tasks[key]?.map((val2, taskindex) => (
                                            <Tr key={`${taskindex}`}>
                                                <Td>{key}</Td>
                                                <Td>{taskindex + 1}</Td>
                                                <Td>{val2?.Task}</Td>
                                                <Td>
                                                    <Input
                                                        size="sm"
                                                        width="50px"
                                                        textAlign="center"
                                                        value={marks[`${x?.Name}-${dayindex}-${taskindex}`] || val2?.GetMarks || ""}
                                                        onChange={(e) => setMarks((state) => ({ ...state, [`${x?.Name}-${dayindex}-${taskindex}`]: e.target.value, }))} />
                                                </Td>
                                                <Td>{val2?.Marks}</Td>
                                                <Td display={"flex"} gap={2}>
                                                    <Button
                                                        size="sm"
                                                        colorScheme="blue"
                                                        width={"fit-content"}
                                                        onClick={() =>
                                                            GivenMarks(
                                                                x?.Reg_No,
                                                                marks[`${x?.Name}-${dayindex}-${taskindex}`] || val2?.GotMarks,
                                                                val2?.Marks,
                                                                key,
                                                                taskindex
                                                            )
                                                        }
                                                    >Save</Button>
                                                    <Popover>
                                                        <PopoverTrigger>
                                                            <Button bg={"red"} color={"white"} size="sm" width={"fit-content"}>
                                                                <DeleteIcon />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <Portal>
                                                            <PopoverContent>
                                                                <PopoverArrow />
                                                                <PopoverHeader align="center">Delete Task</PopoverHeader>
                                                                <PopoverCloseButton />
                                                                <PopoverBody
                                                                    justifyContent="center"
                                                                    display={"flex"}
                                                                    style={{ flexDirection: "column" }}
                                                                    gap={3}
                                                                >
                                                                    <Button
                                                                        size="sm"
                                                                        colorScheme="red"
                                                                        onClick={() =>
                                                                            RemoveTask(
                                                                                x?.Reg_No,
                                                                                val2?.Task,
                                                                                key,
                                                                                taskindex
                                                                            )
                                                                        }
                                                                    >X</Button>
                                                                </PopoverBody>
                                                            </PopoverContent>
                                                        </Portal>
                                                    </Popover>
                                                </Td>
                                            </Tr>
                                        ))
                                    )}
                                </Tbody>
                            </Table>
                        </Box>
                    )
            )}
        </Flex>
    )
}
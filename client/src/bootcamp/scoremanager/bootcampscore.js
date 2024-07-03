import {
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Kbd,
    Spinner,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Actions } from "../../actions/actions";
import './scoremanager.css';
import SearchIcon from '@mui/icons-material/Search';

export const BootcampScore = () => {
    const [dat, setDat] = useState([]);
    const [select, setSelect] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [marks, setMarks] = useState({});
    const toast = useToast();
    const searchInputRef = useRef(null);

    const fetchStudentData = async () => {
        await Actions.Students()
            .then((res) => {
                setDat(res?.data)
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e)
            });
    };

    const GivenMarks = async (user, marks, total, dayindex, taskindex) => {
        if (marks <= parseInt(total)) {
            await Actions.Givenmarks(user, marks, dayindex, taskindex)
                .then((res) => {
                    if (res?.data) {
                        fetchStudentData();
                        toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true });
                    } else {
                        toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true });
                    }
                })
                .catch((e) => {
                    toast({ title: e?.message, status: 'error', position: 'bottom-right', isClosable: true });
                });
        } else {
            toast({ title: "Marks error", status: 'warning', position: 'bottom-right', isClosable: true });
        }
    };

    useEffect(() => {
        fetchStudentData();

        const handleKeyDown = (event) => {
            console.log(event.key)

            if (event.shiftKey && (event.key === 'f'|| event.key === 'F')) {

                event.preventDefault();
                searchInputRef.current.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
     console.log(window.innerWidth)
    return (
        <div className="scores">
        <Box display="flex" justifyContent="center" mb={6}>
                <InputGroup width="70%">
                    <Input
                        ref={searchInputRef}
                        id="search"
                        value={select}
                        placeholder="Enter User mail or name"
                        onChange={(e) => setSelect(e.target.value)}
                    />
                    <InputRightElement pointerEvents="none" width="auto">
                        <Flex alignItems="center">
                            <Kbd color="black">shift</Kbd> + <Kbd color="black">F</Kbd> <SearchIcon />
                        </Flex>
                    </InputRightElement>
                </InputGroup>
            </Box>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <Spinner size="xl" />
                </Box>
            ) : (
                <Flex flexDirection="column" alignItems="center">
                    {dat.filter(user =>
                        user?.Reg_No?.toLowerCase()?.includes(select) ||
                        user?.Reg_No?.toUpperCase()?.includes(select) ||
                        user?.Name?.toUpperCase()?.includes(select) ||
                        user?.Name?.toLowerCase()?.includes(select)
                    )?.map((x, index) => (
                        x?.Tasks && <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="auto"
                            shadow="lg"
                            m={4}
                            p={4}
                            width="100%"
                            maxW="xx-l"
                        >
                            <Heading as="h2" size="md" mb={4}>{x?.Name.toUpperCase()}</Heading>
                            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                                <Badge colorScheme="blue">{x?.Year} Btech</Badge>
                            </Flex>
                            <Table variant="simple">
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
                                    {Object.values(x?.Tasks || {}).map((val, dayindex) => (
                                        val?.map((val2, taskindex) => (
                                            <Tr key={`${dayindex}-${taskindex}`}>
                                                <Td> {dayindex + 1}</Td>
                                                <Td>{dayindex + 1}</Td>
                                                <Td>{val2?.Task}</Td>
                                                <Td>
                                                    <Input
                                                        size="sm"
                                                        width="50px"
                                                        textAlign="center"
                                                        value={marks[val2?.Task] || val2?.GetMarks || ''}
                                                        onChange={(e) => setMarks(state => ({ ...state, [val2?.Task]: e.target.value }))}
                                                    />
                                                </Td>
                                                <Td>{val2?.Marks}</Td>
                                                <Td>
                                                    <Button
                                                        size="sm"
                                                        colorScheme="blue"
                                                        onClick={() => GivenMarks(x?.Reg_No, marks[val2?.Task] || val2?.GotMarks, val2?.Marks, dayindex, taskindex)}
                                                    >
                                                        Save
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        ))
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    ))}
                </Flex>
            )}
        </div>
    );
};

export default BootcampScore;

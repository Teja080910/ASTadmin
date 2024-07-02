import {
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Spinner,
    Text,
    useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Actions } from "../../actions/actions";
import './scoremanager.css';

export const BootcampScore = () => {
    const [dat, setDat] = useState([]);
    const [select, setSelect] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [marks, setMarks] = useState('');
    const toast = useToast()

    const fetchStudentData = async () => {
        await Actions.Students()
            .then((res) => {
                setDat(res?.data)
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e)
            })
    };

    const GivenMarks = async (user, marks, total, dayindex, taskindex) => {
        if (marks <= parseInt(total)) {
            await Actions.Givenmarks(user, marks, dayindex, taskindex)
                .then((res) => {
                    if (res?.data) {
                        fetchStudentData()
                        toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true })
                    } else {
                        toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true })
                    }
                })
                .catch((e) => {
                    toast({ title: e?.message, status: 'error', position: 'bottom-right', isClosable: true })
                })
        } else {
            toast({ title: "marks error", status: 'warning', position: 'bottom-right', isClosable: true })
        }
    }

    useEffect(() => {
        fetchStudentData();
    }, []);
    return (
        <div className="scores">
            {/* <div className="clgname">VEDIC VISION BOOTCAMP</div> */}
            <br />
            <Box display="flex" justifyContent="center" mb={6}>
                <Input
                    id="search"
                    value={select}
                    placeholder="Enter User mail or name"
                    onChange={(e) => setSelect(e.target.value)}
                    width="70%"
                />
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
                            style={{ fontFamily: 'serif' }}
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            shadow="lg"
                            m={4}
                            p={4}
                            textAlign="center"
                            width="100%"
                            maxW="xx-l"
                        >
                            <Heading style={{ fontFamily: 'serif' }} as="h2" size="md">{x?.Name.toUpperCase()}</Heading>
                            <Flex justifyContent="space-between" alignItems="center" mt={2}>
                                <Badge style={{ marginLeft: '80%' }} colorScheme="blue">{x?.Year} Btech</Badge>
                            </Flex>
                            {
                                Object?.values(x?.Tasks ? x?.Tasks : 0)?.map((val, dayindex) => (
                                    <div>
                                        <h6>Day {dayindex + 1}</h6>
                                        {
                                            val?.map((val2, taskindex) => (
                                                <Text className="boxscores" mt={2}>
                                                    <h5>Task {taskindex + 1}: {val2?.Task}</h5>
                                                    <p>score:<input style={{ textAlign: 'center' }} id={val2?.Task} className="blank-input" placeholder='Enter task1 score'
                                                        value={marks[val2?.Task] || val2?.GetMarks || ''}
                                                        onChange={(e) => setMarks(state => ({ ...state, [val2?.Task]: e.target.value }))}
                                                    />/{val2?.Marks}</p>
                                                    <Button mt={2} onClick={() => GivenMarks(x?.Reg_No, marks[val2?.Task] || val2?.GotMarks, val2?.Marks, dayindex, taskindex)}>Save</Button>
                                                </Text>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </Box>
                    ))}
                </Flex>
            )}
        </div>
    );
};

export default BootcampScore;

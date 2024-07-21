import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    useToast,
    CircularProgress,
    Text,
} from "@chakra-ui/react";
import { Actions } from "../../actions/actions";

const HackathonTeamRegistrer = () => {
    const toast = useToast();
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await Actions.TeamRegistrers();
            setTeams(res?.data || []);
        } catch (error) {
            console.error("Error fetching teams:", error);
            toast({
                title: "Failed to fetch teams.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Passwords do not match.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await Actions.CreateRegistrer(formData.id, formData.name, formData.password);
     
            if (response?.data?.message === "Success") {
                setTeams((prev) => [...prev,{HtrCode:formData.id, Name:formData.name,Status:"active"} ]);
                setFormData({ id: "", name: "", password: "", confirmPassword: "" });

                toast({
                    title: "Register created successfully.",
                    status: "success",
                    duration: 3000,
                    position:"bottom-right",
                    isClosable: true,
                });
            } else {
                toast({
                    title: response?.data?.message || "Failed to create register.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error creating register:", error);
            toast({
                title: "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            await Actions.DeleteRegistrer(id);
            setTeams((prev) => prev.filter((team) => team.HtrCode !== id));
            toast({
                title: "Register deleted successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error deleting register:", error);
            toast({
                title: "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id, Status) => {
        try {
            setIsLoading(true);
            const response = await Actions.UpdateRegistrerStatus(id, Status);
            if (!response?.data?.error) {
                setTeams((prev) =>
                    prev.map((team) =>
                        team.HtrCode === id ? { ...team, Status } : team
                    )
                );
                toast({
                    title: "Status updated successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: response?.data?.message || "Failed to update status.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast({
                title: "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    };

    return (
        <Flex direction="column" align="center" p={8} maxW="1200px" m="0 auto">
              <Box>
                <Text as="h3" >Create Problem Statement Register</Text>
            </Box>
            <Box w="100%" maxW="500px" mb={8}>
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Register Mobile Number</FormLabel>
                        <Input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="Enter Register Mobile Number"
                        />
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Register Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Register Name"
                        />
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                        />
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            onKeyDown={handleEnterKey}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" w="100%" isLoading={isLoading}>
                        Create Register
                    </Button>
                </form>
            </Box>

            <Box maxW="100%" overflow="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Register ID</Th>
                            <Th>Register Name</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {teams.map((team, index) => (
                            <Tr key={index}>
                                <Td>{team.HtrCode}</Td>
                                <Td>{team.Name}</Td>
                                <Td>
                                    <Select
                                        value={team.Status || ""}
                                        onChange={(e) =>
                                            handleStatusChange(team.HtrCode, e.target.value)
                                        }
                                        placeholder="Select status"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </Select>
                                </Td>
                                <Td>
                                    <Button
                                        colorScheme="red"
                                        onClick={() => handleDelete(team.HtrCode)}
                                        isLoading={isLoading}
                                    >
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    );
};

export default HackathonTeamRegistrer;

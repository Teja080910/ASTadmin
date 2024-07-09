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

    const fetchData = async () => {
        await Actions.TeamRegistrers()
            .then((res) => setTeams(res?.data))
            .catch((e) => console.log(e))
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
            const response = await Actions.CreateRegistrer(formData.id, formData.name, formData.password);
            if (response.data.message === "success") {
                setTeams((prev) => [...prev, formData]);
                setFormData({ id: "", name: "", password: "", confirmPassword: "" });

                toast({
                    title: "Registrer created successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await Actions.DeleteRegistrer(id);
            setTeams((prev) => prev.filter((team) => team.id !== id));
            toast({
                title: "Registrer deleted successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await Actions.UpdateRegistrerStatus(id, status);
            setTeams((prev) =>
                prev.map((team) =>
                    team.id === id ? { ...team, status } : team
                )
            );
            toast({
                title: "Status updated successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction="column" align="center" p={8} maxW="1200px" m="0 auto">
            <Box w="100%" maxW="500px" mb={8}>
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Register ID</FormLabel>
                        <Input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="Enter Register ID"
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
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" w="100%">
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
                                <Td>{team.id}</Td>
                                <Td>{team.name}</Td>
                                <Td>
                                    <Select
                                        value={team.status || ""}
                                        onChange={(e) =>
                                            handleStatusChange(team.id, e.target.value)
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
                                        onClick={() => handleDelete(team.id)}
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

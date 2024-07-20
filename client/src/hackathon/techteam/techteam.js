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
    Text,
    IconButton
} from "@chakra-ui/react";
import { Actions } from "../../actions/actions";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

const HackathonTechTeam = () => {
    const toast = useToast();
    const [teamMembers, setTeamMembers] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        subject: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState({});
    const [deleteLoading, setDeleteLoading] = useState({});
    const [editingSubject, setEditingSubject] = useState(null);
    const [newSubject, setNewSubject] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await Actions.TeamMembers();
            setTeamMembers(res?.data || []);
        } catch (error) {
            console.error("Error fetching team members:", error);
            toast({
                title: "Failed to fetch team members.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
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
            const response = await Actions.CreateTechTeamMember(formData.id, formData.name, formData.subject, formData.password);
            if (response?.data?.message === "Success") {
                setTeamMembers((prev) => [...prev, { MemberID: formData.id, Name: formData.name, Subject: formData.subject, Status: "active" }]);
                setFormData({ id: "", name: "", subject: "", password: "", confirmPassword: "" });

                toast({
                    title: "Tech team member created successfully.",
                    status: "success",
                    duration: 3000,
                    position: "bottom-right",
                    isClosable: true,
                });
            } else {
                toast({
                    title: response?.data?.message || "Failed to create tech team member.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error creating tech team member:", error);
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
            setDeleteLoading((prev) => ({ ...prev, [id]: true }));
            await Actions.DeleteTechTeamMember(id);
            setTeamMembers((prev) => prev.filter((member) => member.id !== id));
            toast({
                title: "Tech team member deleted successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error deleting tech team member:", error);
            toast({
                title: "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setDeleteLoading((prev) => ({ ...prev, [id]: false }));
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            setStatusLoading((prev) => ({ ...prev, [id]: true }));
            const response = await Actions.UpdateTechTeamMemberStatus(id, status);
            if (!response?.data?.error) {
                setTeamMembers((prev) =>
                    prev.map((member) =>
                        member.MemberID === id ? { ...member, Status:status } : member
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
            setStatusLoading((prev) => ({ ...prev, [id]: false }));
        }
    };

    const handleEditSubject = (id, currentSubject) => {
        setEditingSubject(id);
        setNewSubject(currentSubject);
    };

    const handleSaveSubject = async (id) => {
        try {
            setStatusLoading((prev) => ({ ...prev, [id]: true }));
            const response = await Actions.UpdateTechTeamMemberSubject(id, newSubject);
            if (!response?.data?.error) {
                setTeamMembers((prev) =>
                    prev.map((member) =>
                        member.MemberID === id ? { ...member, Subject: newSubject } : member
                    )
                );
                setEditingSubject(null);
                toast({
                    title: "Subject updated successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: response?.data?.message || "Failed to update subject.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error updating subject:", error);
            toast({
                title: "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setStatusLoading((prev) => ({ ...prev, [id]: false }));
        }
    };

    const handleCancelEdit = () => {
        setEditingSubject(null);
    };

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    };

    return (
        <Flex direction="column" align="center" p={8} maxW="1200px" m="0 auto">
            <Box>
                <Text as="h3">Create Tech Team Member</Text>
            </Box>
            <Box w="100%" maxW="500px" mb={8}>
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired mb={2}>
                        <FormLabel>Mobile Number</FormLabel>
                        <Input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="Enter Tech Team Member Mobile Number"
                        />
                    </FormControl>
                    <FormControl isRequired mb={2}>
                        <FormLabel>Member Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Member Name"
                        />
                    </FormControl>
                    <FormControl isRequired mb={2}>
                        <FormLabel>Taken Care of</FormLabel>
                        <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Enter Subject"
                        />
                    </FormControl>
                    <Box display="flex" gap={2}>
                        <FormControl isRequired mb={2}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                            />
                        </FormControl>
                        <FormControl isRequired mb={2}>
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
                    </Box>
                    <Button type="submit" colorScheme="blue" w="100%" isLoading={isLoading}>
                        Create Tech Team Member
                    </Button>
                </form>
            </Box>
            <Box maxW="100%" overflow="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Mobile</Th>
                            <Th>Name</Th>
                            <Th>Taken care of</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {teamMembers.map((member, index) => (
                            <Tr key={index}>
                                <Td>{member.MemberID}</Td>
                                <Td>{member.Name}</Td>
                                <Td>
                                    {editingSubject === member.MemberID ? (
                                        <Flex alignItems="center">
                                            <Input
                                                value={newSubject}
                                                onChange={(e) => setNewSubject(e.target.value)}
                                                size="sm"
                                            />
                                            <IconButton
                                                icon={<CheckIcon />}
                                                onClick={() => handleSaveSubject(member.MemberID)}
                                                size="sm"
                                                colorScheme="green"
                                                ml={2}
                                            />
                                            <IconButton
                                                icon={<CloseIcon />}
                                                onClick={handleCancelEdit}
                                                size="sm"
                                                ml={2}
                                                colorScheme="red"
                                            />
                                        </Flex>
                                    ) : (
                                        <Flex alignItems="center">
                                            {member.Subject}
                                            <IconButton
                                                icon={<EditIcon />}
                                                onClick={() => handleEditSubject(member.MemberID, member.Subject)}
                                                size="sm"
                                                ml={2}
                                                colorScheme="blue"
                                            />
                                        </Flex>
                                    )}
                                </Td>
                                <Td>
                                    <Select
                                        value={member.Status || ""}
                                        onChange={(e) =>
                                            handleStatusChange(member.MemberID, e.target.value)
                                        }
                                        placeholder="Select status"
                                        isLoading={statusLoading[member.MemberID] || false}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </Select>
                                </Td>
                                <Td>
                                    <Button
                                        colorScheme="red"
                                        onClick={() => handleDelete(member.MemberID)}
                                        isLoading={deleteLoading[member.MemberID] || false}
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

export default HackathonTechTeam;

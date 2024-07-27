import {
    Box,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Actions } from "../../actions/actions";

export const UpdateTeam = ({ isOpen, onClose, team, refresh }) => {
    const toast = useToast();
    const [teamName, setTeamName] = useState("");
    const [gmail, setGmail] = useState("");
    const [code, setCode] = useState("");
    const [phone, setPhone] = useState("");
    const [members, setMembers] = useState(0);
    const [memberDetails, setMemberDetails] = useState([]);

    useEffect(() => {
        if (team) {
            const { Team, Gmail, TeamCode, Phone, Members } = team;
            setTeamName(Team || "");
            setGmail(Gmail || "");
            setCode(TeamCode || "");
            setPhone(Phone || "");
            setMembers(Members?.length || 0);
            setMemberDetails(Array?.isArray(Members) ? Members : []);
        }
    }, [team]);

    const handleMemberDetailsChange = (index, value) => {
        setMemberDetails((prevDetails) => {
            const newDetails = [...prevDetails];
            newDetails[index] = value;
            return newDetails;
        });
    };

    const handleSubmit = async () => {
        if (teamName && gmail && code && phone && members && memberDetails?.length === parseInt(members)) {
            if (new Set(memberDetails).size !== memberDetails.length) {
                toast({
                    title: "Duplicate team details found",
                    status: "error",
                    position: "bottom-right",
                    isClosable: true,
                });
                return;
            }
            if (!memberDetails?.every((detail) => detail.length === 10)) {
                toast({
                    title: "Each team detail must be exactly 10 characters long",
                    status: "error",
                    position: "bottom-right",
                    isClosable: true,
                });
                return;
            }

            const memberDetailsString = memberDetails.join(",");
            try {
                const res = await Actions.UpdateTeam(teamName, gmail, phone, code, memberDetailsString);
                if (res?.data?.message === "Success") {
                    toast({
                        title: "Team updated successfully!",
                        status: "success",
                        position: "top-right",
                        isClosable: true,
                    });
                    refresh();
                    onClose();
                } else if (res?.data?.error) {
                    const { error, code, matchingNumbers } = res.data;
                    toast({
                        title: error,
                        description: code ? "" : matchingNumbers?.length ? `Matching Numbers: ${matchingNumbers.join(", ")}` : "",
                        status: code ? "warning" : "error",
                        position: "bottom-right",
                        isClosable: true,
                        duration: 10000,
                    });
                    if (code) {
                        refresh();
                        onClose();
                    }
                } else {
                    toast({
                        title: "Failed to update team",
                        status: "error",
                        position: "bottom-right",
                        isClosable: true,
                    });
                }
            } catch (e) {
                toast({
                    title: "Error updating team",
                    description: e.message,
                    status: "error",
                    position: "bottom-right",
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: "All fields are required",
                status: "error",
                position: "bottom-right",
                isClosable: true,
            });
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Team Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box mb={5}>
                        <Input
                            placeholder="Team Name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value.toUpperCase())}
                            mb={2}
                            disabled
                        />
                        <Input
                            placeholder="Team Leader Email"
                            type="email"
                            value={gmail}
                            onChange={(e) => setGmail(e.target.value)}
                            mb={2}
                        />
                        <Input
                            placeholder="Team Leader Phone Number"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/[ ,.]/g, ""))}
                            mb={2}
                            maxLength={10}
                        />
                        <Select
                            placeholder="Select Team Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            mb={2}
                            disabled
                        >
                            {team && (
                                <option value={team?.TeamCode}>
                                    {team?.TeamCode}
                                </option>
                            )}
                        </Select>
                        <Select
                            placeholder="Select Number of Members"
                            value={members}
                            onChange={(e) => {
                                const newMembersCount = parseInt(e.target.value);
                                setMembers(newMembersCount);
                                setMemberDetails((prevDetails) => {
                                    const newDetails = [...prevDetails];
                                    if (newMembersCount > prevDetails.length) {
                                        return [...newDetails, ...Array(newMembersCount - prevDetails.length).fill("")];
                                    } else {
                                        return newDetails.slice(0, newMembersCount);
                                    }
                                });
                            }}
                            mb={2}
                        >
                            {[4, 5, 6]?.map((num) => (
                                <option key={num} value={num}>
                                    Team of {num}
                                </option>
                            ))}
                        </Select>
                        {Array?.from({ length: members })?.map((_, index) => (
                            <Input
                                key={index}
                                placeholder={`Team ${index + 1 === 1 ? "Leader" : "Member " + (index + 1)} Registration Number`}
                                type="text"
                                maxLength={10}
                                value={memberDetails[index] || ""}
                                onChange={(e) => handleMemberDetailsChange(index, e.target.value.toLowerCase())}
                                mb={2}
                            />
                        ))}
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Update Team
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
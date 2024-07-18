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
import { useState, useEffect } from "react";
import { Actions } from "../../actions/actions";

export const UpdateTeam = ({ isOpen, onClose, team, refresh }) => {
    const toast = useToast();
    const [teamName, setTeamName] = useState(team?.Team || "");
    const [gmail, setGmail] = useState(team?.Gmail || "");
    const [code, setCode] = useState(team?.TeamCode || "");
    const [phone, setPhone] = useState(team?.Phone || "");
    const [members, setMembers] = useState(team?.Members?.length || 0);
    const [memberDetails, setMemberDetails] = useState(Array.isArray(team?.Members) ? team.Members : []);

    useEffect(() => {
        if (team) {
            setTeamName(team.Team);
            setGmail(team.Gmail);
            setCode(team.TeamCode);
            setPhone(team.Phone);
            setMembers(team.Members?.length || 0);
            setMemberDetails(Array.isArray(team.Members) ? team.Members : []);
        }
    }, [team]);

    const handleMemberDetailsChange = (index, value) => {
        const newMemberDetails = [...memberDetails];
        newMemberDetails[index] = value;
        setMemberDetails(newMemberDetails);
    };

    const handleSubmit = async () => {
        if (teamName && gmail && code && phone && members && memberDetails.length === parseInt(members)) {
            if (new Set(memberDetails).size !== memberDetails.length) {
                toast({
                    title: "Duplicate team details found",
                    status: "error",
                    position: "bottom-right",
                    isClosable: true,
                });
                return;
            }
            if (!memberDetails.every((detail) => detail.length === 10)) {
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


                    if(res?.data?.code){
                        toast({
                            title: res.data.error,
                            status: "warning",
                            position: "bottom-right",
                            isClosable: true,
                            duration: 10000,
                        });
                        refresh();
                        onClose();

                    }else{
                        toast({
                            title: res.data.error,
                            description: res.data.matchingNumbers?.length ? `Matching Numbers: ${res.data.matchingNumbers.join(", ")}` : "",
                            status: "error",
                            position: "bottom-right",
                            isClosable: true,
                            duration: 10000,
                        });
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
                                <option value={team.TeamCode}>
                                    {team.TeamCode}
                                </option>
                            )}
                        </Select>
                        <Select
                            placeholder="Select Number of Members"
                            value={members}
                            onChange={(e) => {
                                setMembers(e.target.value);
                                setMemberDetails(Array(parseInt(e.target.value)).fill(""));
                            }}
                            mb={2}
                        >
                            {[4, 5, 6].map((num) => (
                                <option key={num} value={num}>
                                    Team of {num}
                                </option>
                            ))}
                        </Select>
                        {Array.from({ length: parseInt(members) || 0 }).map((_, index) => (
                            <Input
                                key={index}
                                placeholder={`Team ${index + 1 === 1 ? "Leader" : "Member " + (index + 1)} Registration Number`}
                                type="text"
                                maxLength={10}
                                value={memberDetails[index] || team.Members[index]}
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

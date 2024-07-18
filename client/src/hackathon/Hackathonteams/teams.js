import {
    Box,
    Button,
    Input,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { Actions } from '../../actions/actions';
import { UpdateTeam } from './update-team-modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Teams = ({ data, refresh }) => {
    const toast = useToast();
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [search, setSearch] = useState('');
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            
            if (event.shiftKey && event.key.toLowerCase() === 'f') {
                event.preventDefault();
                searchInputRef.current.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const Delete = async (teamCode) => {
        await Actions.DeleteTeam(teamCode)
            .then((res) => {
                if (res?.data?.message) {
                    refresh();
                    toast({ title: 'Deleted successfully', position: 'top-right', status: 'success', isClosable: true });
                }
            })
            .catch((err) => {
                toast({ title: 'Error deleting team', position: 'top-right', status: 'error', isClosable: true });
            });
    };

    const handleUpdateOpen = (team) => {
        setSelectedTeam(team);
        setIsUpdateOpen(true);
    };

    const handleUpdateClose = () => {
        setIsUpdateOpen(false);
        setSelectedTeam(null);
    };

    const filteredData = data.filter((team) => 
        team.TeamCode.toString().includes(search) || 
        (team.Team && team.Team.toLowerCase().includes(search.toLowerCase())) || 
        (Array.isArray(team.Members) && team.Members.some(member => member.toLowerCase().includes(search.toLowerCase())))
    );

    return (
        <Box >
            <Box mb={4} width="">
                <Input
                    ref={searchInputRef}
                    placeholder="Search by Team Code, Team Name or Members"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="lg"
                />
            </Box>
            <TableContainer >
                <Table variant='simple'>
                    <TableCaption>Hackathon Teams</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Team Code</Th>
                            <Th>Team Name</Th>
                            <Th>Members</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            filteredData.map((team) => (
                                <Tr key={team.TeamCode}>
                                    <Td>{team.TeamCode}</Td>
                                    <Td>{team?.Team}</Td>
                                    <Td>{Array.isArray(team?.Members) ? team?.Members?.length - team.Members.join(", ") : "No members"}</Td>
                                    <Td>
                                        {team?.Team && (
                                            <div style={{display:"flex",gap:"5px", alignItems:"stretch"}}>
                                                <Button colorScheme='blue' onClick={() => handleUpdateOpen(team)} size="sm"><EditIcon /></Button>
                                                <Button bg={'red'} color={'white'} onClick={() => Delete(team?.TeamCode)} size="sm"><DeleteIcon/></Button>
                                            </div>
                                        )}
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            {isUpdateOpen && (
                <UpdateTeam
                    isOpen={isUpdateOpen}
                    onClose={handleUpdateClose}
                    team={selectedTeam}
                    refresh={refresh}
                />
            )}
        </Box>
    );
};

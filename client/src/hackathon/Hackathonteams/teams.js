import {
    Button,
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
import { useState } from 'react';
import { Actions } from '../../actions/actions';
import { UpdateTeam } from './update-team-modal';

import DeleteIcon from '@mui/icons-material/Delete';
export const Teams = ({ data, refresh }) => {
    const toast = useToast();
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const Delete = async (team) => {
        await Actions.DeleteTeam(team)
            .then((res) => {
                if (res?.data?.message) {
                    refresh();
                    toast({ title: 'Delete', position: 'top-right', status: 'success', isClosable: true });
                }
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

    return (
        <div className='teamstable'>
            <TableContainer width={"80%"}>
                <Table variant='simple'>
                    <TableCaption>Hackathon Teams</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Team Code</Th>
                            <Th>Team Name</Th>
                            <Th>Members</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data?.map((team) => (
                                <Tr key={team.TeamCode}>
                                    <Td>{team.TeamCode}</Td>
                                    <Td>{team?.Team}</Td>
                                    <Td>{team?.Members?.join(", ")}</Td>
                                    <Td>
                                        {team.Team && (
                                            <div>
                                                <Button colorScheme='blue' onClick={() => handleUpdateOpen(team)}>Update</Button>
                                                <Button bg={'red'} color={'white'} onClick={() => Delete(team.TeamCode)}><DeleteIcon/></Button>
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
        </div>
    );
};

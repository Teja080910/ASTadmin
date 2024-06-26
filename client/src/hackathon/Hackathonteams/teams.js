import {
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react'
export const Teams = ({ data }) => {
    return (
        <div className='teamstable'>
            <TableContainer width={"80%"}>
                <Table variant='simple'>
                    <TableCaption>Hacthon Teams</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Team Code</Th>
                            <Th>Team Name</Th>
                            <Th>Members</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data?.map((team) => (
                                <Tr key={team}>
                                    <Td>{team?.TeamCode}</Td>
                                    <Td>{team?.TeamName}</Td>
                                    <Td>{team?.TeamMembers}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}
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
import { Button } from 'react-bootstrap'
export const AllMaterials = () => {
    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Boot camp materials</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Theme</Th>
                        <Th>Name</Th>
                        <Th>Links</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>HTML</Td>
                        <Td>BASIC HTML</Td>
                        <Td>
                            <Tr>
                                <Td>
                                    <a>Photo</a>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <a>file</a>
                                </Td>
                            </Tr>
                        </Td>
                        <Td>
                            <Button variant='danger'>Delete</Button>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}
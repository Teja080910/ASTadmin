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
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
export const AllMaterials = () => {
    const [data, setData] = useState([])
    const OpenFile = async (file) => {
        try {
            const url = `${process.env.REACT_APP_database}/file/${file}`
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', file)
            // document.body.appendChild(link)
            link.click()
            // document.body.removeChild(link)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/files")
            .then((res) => setData(res.data))
            .catch((e) => console.log(e))
    })
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
                {
                    data?.map((val) => (
                        <Tbody>
                            <Tr>
                                <Td>HTML</Td>
                                <Td>{val?.filename}</Td>
                                <Td>
                                    <Tr>
                                        <Td>
                                            <Button onClick={() => OpenFile(val?.filename)}>Photo</Button>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>
                                            <Button onClick={() => OpenFile(val?.filename)}>Files</Button>
                                        </Td>
                                    </Tr>
                                </Td>
                                <Td>
                                    <Button variant='danger'>Delete</Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    ))
                }
            </Table>
        </TableContainer>
    )
}
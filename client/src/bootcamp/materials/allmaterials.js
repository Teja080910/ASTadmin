import {
    Button as ChakraButton,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './materials.css';
import { Box } from '@chakra-ui/react';

export const AllMaterials = () => {
    const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const OpenFile = async (file) => {
        try {
             const url = `${process.env.REACT_APP_database}/file/${file}`;
            window.open(url, '_blank');
        } catch (e) {
            console.log(e);
        }
    };

    const OpenImage = async (filename) => {
        try {
            const url = `${process.env.REACT_APP_database}/file/${filename}`;
            const response = await axios.get(url, { responseType: 'blob' });
            if (response.data.type.startsWith('text/xml')) {
                const imageBlob = new Blob([response.data], { type: 'image' });
                const imageUrl = URL.createObjectURL(imageBlob);
                console.log(imageUrl)
                setImageUrl(imageUrl);
            } else {
                console.error('The file is not an image');
                setError('The file is not an image');
            }
        } catch (e) {
            console.error(e);
            setError('Error opening file');
        }
    };
    console.log(imageUrl)
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/files")
            .then((res) => setData(res.data))
            .catch((e) => console.log(e));
    }, []);

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
                {data?.map((val) => (
                    <Tbody key={val.id}>
                        <Tr>
                            <Td>HTML</Td>
                            <Td>{val?.filename}</Td>
                            <Td>
                                <ChakraButton
                                    colorScheme="blue"
                                    size="sm"
                                    mr={2}
                                    onClick={() => OpenImage(val?.filename)}
                                >
                                    Photo
                                </ChakraButton>
                                <ChakraButton
                                    colorScheme="blue"
                                    size="sm"
                                    mr={2}
                                    onClick={() => OpenFile(val?.filename)}
                                >Files
                                </ChakraButton>
                            </Td>
                            <Td>
                                <ChakraButton size={'sm'} colorScheme='red'>Delete</ChakraButton>
                            </Td>
                        </Tr>
                    </Tbody>
                ))}
            </Table>
            {imageUrl && (
                <Box mt={4} textAlign="center">
                    <img src={imageUrl} alt="file preview" style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
            )}
        </TableContainer>
    );
};

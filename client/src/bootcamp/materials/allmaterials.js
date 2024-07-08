import {
    Box,
    Button,
    Button as ChakraButton,
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
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Actions } from '../../actions/actions';
import { MaterialModel } from './materialmodel';
import './materials.css';

export const AllMaterials = () => {
    const [data, setData] = useState([]);
    const toast = useToast()
    const [fileUrl, setFileUrl] = useState('');
    const [fileType, setFileType] = useState('');
    const [imageContent, setImageContent] = useState('');
    const [model, setModel] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    window.title = "Student Materials | Bootcamp | VEDIC VISION | TEAM AST"

    const OpenFile = async (filename) => {
        try {
            setModel(true)
            const url = `${process.env.REACT_APP_database}/file/${filename}`;
            const response = await axios.get(url, { responseType: 'blob' });
            const fileType = response.data.type;
            console.log(fileType)
            if (fileType.startsWith('image/')) {
                const imageBlob = new Blob([response.data], { type: fileType });
                const imageUrl = URL.createObjectURL(imageBlob);
                setFileUrl(imageUrl);
                setFileType('image');
                setImageContent('');
            } else if (fileType === 'image/svg+xml') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImageContent(e.target.result);
                    setFileUrl('');
                    setFileType('svg');
                };
                reader.readAsText(response.data);
            } else if (fileType === 'application/pdf') {
                const pdfBlob = new Blob([response.data], { type: fileType });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setFileUrl(pdfUrl);
                setFileType('pdf');
                setImageContent('');
            } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                const pdfBlob = new Blob([response.data], { type: fileType });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setFileUrl(pdfUrl);
                setFileType('pdf');
                setImageContent('');
            } else {
                console.error('The file is not an image or PDF');
                setError('The file is not an image or PDF');
            }
        } catch (e) {
            console.error(e);
            setError('Error opening file');
        }
    };

    const fecthFiles = async () => {
        await Actions.AllMaterials()
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to fetch materials');
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fecthFiles()
    }, []);

    const Show = async (theme) => {
        await Actions.EditMaterials(theme)
            .then((res) => {
                if (res?.data) {
                    fecthFiles()
                    toast({ title: "Access:" + res?.data?.message, status: 'success', position: 'top-right', isClosable: true })
                } else {
                    toast({ title: "Access: " + res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true })
                }
            })
            .catch((e) => {
                toast({ title: e?.message, status: 'error', position: 'bottom-right', isClosable: true })
                console.log(e)
            })
    }

    const handleDelete = async (photo, pdf, theme) => {
        await Actions.DeleteMaterial(photo, pdf, theme)
            .then((res) => {
                if (res?.data) {
                    toast({ title: "deleted", status: 'success', position: 'top-right', isClosable: true })
                    fecthFiles()
                } else {
                    toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true })
                }
            })
            .catch((e) => {
                toast({ title: e?.message, status: 'error', position: 'bottom-right', isClosable: true })
                console.log(e)
            })
    };

    return (
        <>
            {fileUrl && <MaterialModel open={model} close={() => { setModel(false); setFileUrl('') }} fileType={fileType} fileUrl={fileUrl} imageContent={imageContent} />}
            <Box>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Boot camp materials</TableCaption>
                        <Thead>
                            <Th>Name</Th>
                            <Th>Type</Th>
                            <Th colSpan={2} textAlign="center">View</Th>
                            <Th>Delete</Th>
                        </Thead>
                        <Tbody>
                            {isLoading ? (
                                <Tr>
                                    <Td colSpan={4}>No materials found</Td>
                                </Tr>
                            ) : error ? (
                                <Tr>
                                    <Td colSpan={4}>Error: {error} <Button size={'sm'} onClick={()=>{fecthFiles();setError('')}}>Refesh</Button></Td>
                                </Tr>
                            ) : (
                                data?.map((material) => (
                                    <>
                                        <Tr>
                                            <Th colSpan={3} textAlign={"center"}>Theme : <strong>{material?.Theme}</strong></Th>
                                            <Th colSpan={2}>
                                                {!material?.Show ? <ChakraButton colorScheme="orange" size="sm" mr={2} onClick={() => Show(material?.Theme)}>Show</ChakraButton> :
                                                    <ChakraButton colorScheme="orange" size="sm" mr={2} onClick={() => Show(material?.Theme)}>Hide</ChakraButton>}
                                            </Th>
                                        </Tr>
                                        {
                                            material?.Links?.map((link) => (
                                                <Tr key={link?.id}>
                                                    <Td>{link?.Name}</Td>
                                                    <Td>{(link?.Photoname).slice(-3) + "," + (link?.Pdfname).slice(-3)}</Td>
                                                    <Td>
                                                        <ChakraButton
                                                            colorScheme="blue"
                                                            size="sm"
                                                            mr={2}
                                                            onClick={() => OpenFile(link?.Photoname)}
                                                        >
                                                            Photo
                                                        </ChakraButton>
                                                    </Td>
                                                    <Td>
                                                        <ChakraButton
                                                            colorScheme="blue"
                                                            size="sm"
                                                            mr={2}
                                                            onClick={() => OpenFile(link?.Pdfname)}
                                                        >
                                                            Pdf
                                                        </ChakraButton>
                                                    </Td>
                                                    <Td>
                                                        <ChakraButton
                                                            size="sm"
                                                            colorScheme="red"
                                                            onClick={() => handleDelete(link?.Photoname, link?.Pdfname, material?.Theme)}
                                                        >
                                                            Delete
                                                        </ChakraButton>
                                                    </Td>
                                                </Tr>
                                            ))
                                        }
                                    </>
                                ))
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

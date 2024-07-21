import { Box, Button, HStack, IconButton, Stack, Text, useToast } from '@chakra-ui/react';
import { Label, Select } from "flowbite-react";
import React, { useState } from 'react';
import { Actions } from '../../actions/actions';
import { CloseIcon } from '@chakra-ui/icons';
import uploadImage from './download.jpeg';
import './gallery.css';
import { OpenPhoto } from './openphoto';

export const AddPhotos = ({ teams }) => {
    const [photos, setPhotos] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [teamName, setTeamName] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const toast = useToast();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setPhotos(prevPhotos => [...prevPhotos, ...files]);
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreviews(prevPreviews => [...prevPreviews, ...previewUrls]);
        setFileNames(prevFileNames => [...prevFileNames, ...files.map(file => file.name)]);
    };

    const openModal = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsOpen(false);
    };

    const removeImage = (index) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
        setPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
        setFileNames(prevFileNames => prevFileNames.filter((_, i) => i !== index));
    };

    const UploadFile = async () => {
        setIsLoading(true);
        const formData = new FormData();
        if (photos.length > 0 && teamName) {
            photos.forEach(photo => {
                formData.append("photos", photo);
            });
            formData.append("teamname", teamName);
            try {
                const res = await Actions.UploadPhotos(formData);
                setIsLoading(false);
                if (res?.data?.message) {
                    window.location.reload();
                    toast({ title: res.data.message, status: 'success', position: 'top-right', isClosable: true });
                } else {
                    console.log(res?.data?.data)
                    toast({ title: res?.data?.error, description: res?.data?.data?.map((val) => (<p>{val}</p>)), status: 'error', position: 'bottom-right', isClosable: true });
                }
            } catch (e) {
                setIsLoading(false);
                toast({ title: e.message, status: 'error', position: 'bottom-right', isClosable: true });
            }
        } else {
            setIsLoading(false);
            toast({ title: "All fields are required", status: 'error', position: 'bottom-right', isClosable: true });
        }
    };

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    return (
        <>
            <OpenPhoto isOpen={isOpen} closeModal={closeModal} selectedImage={selectedImage} />
            <div className="mati">
                <div className="matform">
                    <div className="file-inputs">
                        <Stack spacing={8}>
                            <Select placeholder='Select team name' size='lg' onChange={(e) => setTeamName(e.target.value)}>
                                <option value="">Select Team</option>
                                {teams?.map((team) => (
                                    team?.Team && <option key={team?.TeamCode} value={team?.TeamCode}>{team?.Team}</option>
                                ))}
                            </Select>
                            <div style={{ justifyContent: 'center', display: 'flex' }}>
                                <div>
                                    <Label htmlFor="file-upload-helper-text" value="Upload photos" />
                                    <div className="upload-container">
                                        <label htmlFor="file-input">
                                            <img src={uploadImage} alt="Upload Icon" className="upload-icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file-input"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            multiple
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="previews">
                                <Stack spacing={4}>
                                    {chunkArray(previews, 5).map((row, rowIndex) => (
                                        <HStack key={rowIndex} spacing={4}>
                                            {row.map((preview, index) => (
                                                <Box key={index} position="relative" boxSize="100px">
                                                    <img
                                                        src={preview}
                                                        alt={`Preview ${index}`}
                                                        style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
                                                        onClick={() => openModal(preview)}
                                                    />
                                                    <Text position="absolute" bottom="2" left="2" bg="white" opacity="0.7" padding="2px">
                                                        {fileNames[rowIndex * 5 + index]}
                                                    </Text>
                                                    <IconButton
                                                        icon={<CloseIcon />}
                                                        size="sm"
                                                        position="absolute"
                                                        top="2"
                                                        right="2"
                                                        onClick={() => removeImage(rowIndex * 5 + index)}
                                                    />
                                                </Box>
                                            ))}
                                        </HStack>
                                    ))}
                                </Stack>
                            </div>
                            <Button colorScheme='cyan' onClick={UploadFile} isLoading={isLoading}>
                                {isLoading ? "Uploading...." : "Upload"}
                            </Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </>
    );
};
import { Actions } from "../../actions/actions";
import { Button, useToast } from "@chakra-ui/react";
import { Stack, Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { OpenPhoto } from "./openphoto";

export const ShowPhotos = ({ teams }) => {
    const toast = useToast()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const openModal = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsOpen(false);
    };

    return (
        <>
            <OpenPhoto isOpen={isOpen} closeModal={closeModal} selectedImage={selectedImage} />
            <div>
                {
                    teams?.map((team) => (
                        team?.Photos?.map((photo) => (
                            <Stack spacing={4}>
                                {console.log(photo)}
                                {chunkArray(photo, 5)?.map((row, rowIndex) => (
                                    <HStack key={rowIndex} spacing={4}>
                                        {row&&row?.map((preview, index) => (
                                            <Box key={index} position="relative" boxSize="100px">
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index}`}
                                                    style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
                                                    onClick={() => openModal(preview)}
                                                />
                                            </Box>
                                        ))}
                                    </HStack>
                                ))}
                            </Stack>
                        ))
                    ))
                }

                <Button onClick={() => {
                    Actions.DeleteAllMaterials()
                        .then((res) => {
                            toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true });
                            window.location.reload();
                        });
                }}
                    bg="red.600"
                    color="white"
                    size='sm'
                >
                    Delete All
                </Button>
            </div>
        </>
    )
}
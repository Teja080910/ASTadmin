import { Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, SimpleGrid, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Actions } from "../../actions/actions";
import { OpenFile } from "../../actions/openfile";
import { OpenPhoto } from "./openphoto";

export const ShowPhotos = ({ teams, refresh }) => {
    const toast = useToast()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [image, setImage] = useState();

    const openModal = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsOpen(false);
    };

    const fetchImageURL = async (link) => {
        try {
            const imageUrl = await OpenFile(link);
            setImage(state => ({ ...state, [link]: imageUrl?.url }))
        } catch (error) {
            console.error("Error fetching image URL:", error);
            return null;
        }
    };

    return (
        <>
            <OpenPhoto isOpen={isOpen} closeModal={closeModal} selectedImage={selectedImage} />
            {
                teams?.map((team) => (
                    team?.Team && team?.Photos && <>
                        <Flex justifyContent={"space-evenly"}>
                            <Heading size='lg' align="center">Team:<strong style={{ color: 'blue' }}>{team?.Team}</strong></Heading>
                            <Button onClick={() => {
                                Actions.DeleteAllPhotos(team?.TeamCode)
                                    .then((res) => {
                                        toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true });
                                        window.location.reload();
                                    }).catch((e) => console.log(e))
                            }}
                                bg="red.600"
                                color="white"
                                size='sm'
                            >
                                Delete All
                            </Button>
                        </Flex>
                        <SimpleGrid minChildWidth='400px' spacing='40px'>
                            {team?.Photos?.map((photo, photoindex) => (

                                <Card maxW='sm' key={photoindex}>
                                    <CardBody onClick={() => { openModal(image[photo]) }}>
                                        <Image
                                            src={image ? image[photo] : fetchImageURL(photo)}
                                            alt={photo}
                                            width={"100%"}
                                            height={"30vh"}
                                            borderRadius='lg'
                                        />
                                    </CardBody>
                                    <Divider />
                                    <CardFooter justifyContent={"center"}>
                                        <Button variant='solid' colorScheme='red'
                                            onClick={() => {
                                                Actions.DeletePhoto(photo, team?.TeamCode)
                                                    .then((res) => {
                                                        if (res?.data?.message) {
                                                            toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true });
                                                        } else {
                                                            toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true });
                                                        }
                                                        refresh()
                                                    }).catch((e) => console.log(e))
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </>
                ))
            }
        </>
    )
}
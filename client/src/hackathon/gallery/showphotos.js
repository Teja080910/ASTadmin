import { Button, Card, CardBody, CardFooter, Divider, Flex, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Actions } from "../../actions/actions";
import { OpenPhoto } from "./openphoto";

export const ShowPhotos = () => {
    const toast = useToast()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [image, setImage] = useState();
    const [data, setData] = useState([])

    const openModal = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsOpen(false);
    };

    const Photos = async () => {
        await Actions.ShowPhotos()
            .then((res) => setData(res?.data))
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        Photos()
    }, [])

    return (
        <>
            <OpenPhoto isOpen={isOpen} closeModal={closeModal} selectedImage={selectedImage} />
            {
                data?.map((team) => (
                    <>
                        <br />
                        <Flex justifyContent={"space-evenly"}>
                            <Heading size='lg' align="center">Team:<strong style={{ color: 'blue' }}>{team?.folder}</strong></Heading>
                            <Button onClick={() => {
                                Actions.DeleteAllPhotos(team?.folder)
                                    .then((res) => {
                                        toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true });
                                        Photos()
                                    }).catch((e) => console.log(e))
                            }}
                                bg="red.600"
                                color="white"
                                size='sm'
                            >
                                Delete All
                            </Button>
                        </Flex>
                        <br />
                        <SimpleGrid minChildWidth='400px' spacing='40px'>
                            {team?.Links?.map((photo, photoindex) => (

                                <Card maxW='sm' key={photoindex}>
                                    <CardBody onClick={() => { openModal(photo?.id) }}>
                                        <iframe src={`https://drive.google.com/file/d/${photo?.id}/preview`} />
                                    </CardBody>
                                    <Divider />
                                    <CardFooter justifyContent={"center"}>
                                        <Button variant='solid' colorScheme='red'
                                            onClick={() => {
                                                Actions.DeletePhoto(photo?.id)
                                                    .then((res) => {
                                                        if (res?.data?.message) {
                                                            toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true });
                                                        } else {
                                                            toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true });
                                                        }
                                                        Photos()
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
import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/react';

export const OpenPhoto = ({ isOpen, closeModal, selectedImage }) => {
    return (
        <Modal isOpen={isOpen} onClose={closeModal} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton bg={"red.600"}/>
                <ModalBody>
                    <Image src={`https://drive.google.com/thumbnail?id=${selectedImage}`} width={"100%"} height={"100%"} alt={selectedImage} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/react';

export const OpenPhoto = ({ isOpen, closeModal, selectedImage }) => {
    return (
        <Modal isOpen={isOpen} onClose={closeModal} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Image src={selectedImage} width={"100%"} height={"100%"} alt={selectedImage} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={closeModal}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
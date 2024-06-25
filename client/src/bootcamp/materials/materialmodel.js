import {
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react'
export const MaterialModel = ({ open, close, fileType, fileUrl, imageContent }) => {
    return (
        <Modal onClose={close} size={"full"} isOpen={open}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader><ModalCloseButton /></ModalHeader>
                <ModalBody>
                    {fileType === 'image' && fileUrl && (
                        <Box mt={4} textAlign="center">
                            <img src={fileUrl} alt="file preview" style={{ width: '100%', height: '90vh' }} />
                        </Box>
                    )}
                    {fileType === 'svg' && imageContent && (
                        <Box mt={4} textAlign="center">
                            <div dangerouslySetInnerHTML={{ __html: imageContent }} />
                        </Box>
                    )}
                    {fileType === 'pdf' && fileUrl && (
                        <Box mt={4} textAlign="center">
                            <iframe src={fileUrl} style={{ width: '100%', height: '90vh' }} title="PDF preview"></iframe>
                        </Box>
                    )}
                    {fileType === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' && fileUrl && (
                        <Box mt={4} textAlign="center">
                            <iframe src={fileUrl} style={{ width: '100%', height: '90vh' }} title="PDF preview"></iframe>
                        </Box>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
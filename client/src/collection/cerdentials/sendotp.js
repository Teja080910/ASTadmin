import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    PinInput, PinInputField,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { Actions } from '../../actions/actions';
export const SednOTP = ({ atnd, isOpen, onClose }) => {
    const toast = useToast()
    const [otp, setOtp] = useState();
    const handleAttend = async () => {
        try {
            console.log(otp)
            const res = await Actions.StudentLogin(atnd, otp);
            if (res?.data?.message) {
                toast({ title: res.data.message, status: "success", position: "top-right", isClosable: true });
            } else {
                toast({ title: res.data.error, status: "error", position: "bottom-right", isClosable: true });
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack>
                        <PinInput type='alphanumeric' >
                            <PinInputField onChange={(e) => setOtp(e.target.value)} />
                            <PinInputField onChange={(e) => setOtp(otp + e.target.value)} />
                            <PinInputField onChange={(e) => setOtp(otp + e.target.value)} />
                            <PinInputField onChange={(e) => setOtp(otp + e.target.value)} />
                            <PinInputField onChange={(e) => setOtp(otp + e.target.value)} />
                            <PinInputField onChange={(e) => setOtp(otp + e.target.value)} />
                        </PinInput>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='blue' onClick={handleAttend}><b>Submit</b></Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
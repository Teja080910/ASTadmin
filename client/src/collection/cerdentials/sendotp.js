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
    Input,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { Actions } from '../../actions/actions';
export const SednOTP = ({ atnd, isOpen, onClose, data, refresh }) => {
    const toast = useToast()
    const [otp, setOtp] = useState();
    const [load,setLoad]=useState(false)
    const handleAttend = async () => {
        setLoad(true)
        try {
            if (data?.OTP === parseInt(otp) ) {
                const res = await Actions.StudentLogin(atnd, otp);
               
                if (res?.data?.message ) {
                    setOtp('')
                    onClose()
                    toast({ title: res.data?.message, status: "success", position: "top-right", isClosable: true });

                    refresh()
                } else {
                    toast({ title: res.data.error, status: "error", position: "bottom-right", isClosable: true });
                    setLoad(false)
                }
            } else {
                setOtp('')
                toast({ title: "OTP mismatch", status: "error", position: "bottom-right", isClosable: true });
                setLoad(false)
            }
        } catch (error) {
            console.error(error);
            setLoad(false)
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Enter OTP</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack>
                        <Input
                            color='teal'
                            placeholder='Enter OTP'
                            _placeholder={{ color: 'inherit' }}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='blue' onClick={handleAttend}><b>{load?"Submitting...":"Submit"}</b></Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
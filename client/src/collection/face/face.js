import {
  Button,
  Card,
  CardBody, 
  CardFooter,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useToast
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { Actions } from '../../actions/actions';

export const FaceRegorg = ({ isOpen, onClose, regd }) => {
  const toast = useToast();
  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (regd?.num) {
        await Actions.FaceVerify(regd.num, imageSrc)
          .then((res) => {
            if (res?.data?.message) {
              toast({
                title: res.data.message,
                status: "success",
                position: "top-right",
                isClosable: true,
              });
            } else {
              toast({
                title: res.data.error,
                status: "error",
                position: "bottom-right",
                isClosable: true,
              });
            }
          })
          .catch((e) => console.log(e));
      }
    } catch (error) {
      console.log(error);
    }
  }, [regd, toast]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        capture();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, capture]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader align="center">{regd?.name}'s Face Verify</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Card maxW="md">
            <CardBody>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
              />
            </CardBody>
            <CardFooter justify="center" display="flex" bg="#433D8B">
              <Button bg="#C8ACD6">Attend with OTP</Button>
            </CardFooter>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

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
    useToast,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  
  export const DeleteConform = ({ atnd, isOpen, onClose, handleDelete }) => {
    const [enteredRegdno, setenteredRegdno] = useState("");
  
    useEffect(() => {
      atnd && setenteredRegdno(atnd?.slice(0,6));
    }, [atnd]);
  
    const toast = useToast();
    const verifyDelete = () => {
      if (atnd === enteredRegdno) {
        handleDelete();
        onClose();
      } else {
        toast({
          title: "Register Number Not Matched",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    const handelkeydown = (e) => {
      if (e.key === "Enter") {
        verifyDelete();
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Confirm Regd No {atnd?.slice(0, 6)}_ _ _ _
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <Input
                color="teal"
                placeholder="Enter Register Number"
                _placeholder={{ color: "inherit" }}
                value={enteredRegdno}
                onChange={(e) => setenteredRegdno(e.target.value)}
                onKeyDown={handelkeydown}
              />
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={verifyDelete}>
              <b>Delete</b>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
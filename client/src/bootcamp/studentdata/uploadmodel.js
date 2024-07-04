import {
    Button,
    FormControl,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { FileInput, Label } from "flowbite-react";

export const UploadModel = ({ isOpen, onClose }) => {
    const [file, setFile] = useState()
    const toast=useToast()
    const UploadFile = async () => {
        try {
            const formData = new FormData();
        formData.append("file", file);
        await axios.post(process.env.REACT_APP_database + "/studentxlsx", formData)
            .then((res) =>{
                if(res?.data?.message){
                    toast({ title:res?.data?.message, status: "success", position: "top", isClosable: true })
                    setTimeout(() => {
                        window.location.reload(3)
                    }, 1000);
                }
                if(res?.data?.error){
                    toast({ title:res?.data?.error, status: "error", position: "bottom-left", isClosable: true })
                }
                if(res?.data?.duplicates){
                    toast({ title:res?.data?.duplicates, status: "error", position: "bottom-left", isClosable: true })
                }
            })
            .catch((e) => console.log(e))
        } catch (error) {
            toast({ title:error, status: "error", position: "bottom-left", isClosable: true })
        }
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload students data</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <div>
                                <div>
                                    <Label htmlFor="multiple-file-upload" value="Upload xlsx file" />
                                </div>
                                <FileInput id="multiple-file-upload" accept=".xlsx,.xls" helperText="Only XLSX,XLS Accepted" onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                            <Label htmlFor="multiple-file-upload" value="Follow These Column names in your XLS file" />
                            <p>Gmail, Name, Number, Reg_No, Year, Branch, Section</p>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={UploadFile}>
                            Upload
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
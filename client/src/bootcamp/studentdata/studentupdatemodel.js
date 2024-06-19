import { Button, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export const StudentUpdateModel = ({ show, close, data }) => {
    const toast = useToast();
    const [load,setLoad]=useState(false)
    const [student, setStudent] = useState(
        {
            reg: null,
            name: null,
            gmail: null,
            branch: null,
            number: null,
            score: null
        }
    )
    useEffect(() => {

    })
    const Update = async () => {
        try {
            setStudent((val) => ({ ...val, reg: data?.Reg_No }))
            setStudent((val) => ({ ...val, name: student.name || data?.Name }))
            setStudent((val) => ({ ...val, gmail: student.gmail || data?.Gmail }))
            setStudent((val) => ({ ...val, branch: student.branch || data?.Branch }))
            setStudent((val) => ({ ...val, number: student.number || data?.Number }))
            setStudent((val) => ({ ...val, score: student.score || data?.Score }))
            const responce = await axios.post(process.env.REACT_APP_database + "/updatestudent", { student })
            {
                if (responce?.data?.message) {
                    toast({ title: "Update Sucessfully", status: "success", position: "top", isClosable: true })
                    window.location.reload(5)
                }
                else {
                    toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true })
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <Modal show={show} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Update <strong>{data?.Name}</strong> Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{data?.Reg_No}</p>
                <Input placeholder='name' type='text' value={student.name ? student.name : data?.Name} onChange={(e) => setStudent((val) => ({ ...val, name: e.target.value }))} /><br />
                <Input placeholder='gmail' value={student.gmail || data?.Gmail} onChange={(e) => setStudent((val) => ({ ...val, gmail: e.target.value }))} /><br />
                <Input placeholder='branch' value={student.branch || data?.Branch} onChange={(e) => setStudent((val) => ({ ...val, branch: e.target.value }))} /><br />
                <Input placeholder='number' value={student.number || data?.Number} onChange={(e) => setStudent((val) => ({ ...val, number: e.target.value }))} /><br />
                <Input placeholder='score' value={student.score || data?.Score} onChange={(e) => setStudent((val) => ({ ...val, score: e.target.value }))} /><br />
            </Modal.Body>
            <Modal.Footer>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: "100%" }}>
                    <Button colorScheme="yellow" onClick={Update}>{load?"Updating...":"Update"}</Button>
                    <Button colorScheme="orange" onClick={close}>Close</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
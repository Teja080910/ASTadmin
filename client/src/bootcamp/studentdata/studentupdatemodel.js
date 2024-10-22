import { Button, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export const StudentUpdateModal = ({ show, close, data }) => {
    const toast = useToast();
    const [load, setLoad] = useState(false);
    const [student, setStudent] = useState({
        reg: null,
        name: null,
        gmail: null,
        branch: null,
        number: null,
        year: null,
        score: null,
        attendance: null
    });

    useEffect(() => {
        if (data) {
            setStudent({
                reg: data.Reg_No || '',
                name: data.Name || '',
                gmail: data.Gmail || '',
                branch: data.Branch || '',
                number: data.Number || '',
                year: data.Year || '',
                score: data.Score || '',
                attendance: data.AttendDays || ''
            });
        }
    }, [data]);

    const update = async () => {
        try {
            setLoad(true);
            const response = await axios.post(`${process.env.REACT_APP_database}/updatestudent`, { student });
            setLoad(false);
            if (response.data.message) {
                toast({ title: "Update Successfully", status: "success", position: "top", isClosable: true });
                window.location.reload();
            } else {
                toast({ title: response.data.error, status: "error", position: "bottom-left", isClosable: true });
            }
        } catch (e) {
            setLoad(false);
            console.log(e);
            toast({ title: "An error occurred", status: "error", position: "bottom-left", isClosable: true });
        }
    };

    return (
        <Modal show={show} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update <strong>{data?.Name}</strong> Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{data?.Reg_No}</p>
                <Input placeholder='name' type='text' value={student.name} onChange={(e) => setStudent((val) => ({ ...val, name: e.target.value }))} /><br />
                <Input placeholder='gmail' value={student.gmail} onChange={(e) => setStudent((val) => ({ ...val, gmail: e.target.value }))} /><br />
                <Input placeholder='year' value={student.year} onChange={(e) => setStudent((val) => ({ ...val, year: e.target.value }))} /><br />
                <Input placeholder='branch' value={student.branch} onChange={(e) => setStudent((val) => ({ ...val, branch: e.target.value }))} /><br />
                <Input placeholder='number' value={student.number} onChange={(e) => setStudent((val) => ({ ...val, number: e.target.value }))} /><br />
                <Input placeholder='attendance' value={student.attendance} onChange={(e) => setStudent((val) => ({ ...val, attendance: e.target.value }))} /><br />
            </Modal.Body>
            <Modal.Footer>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: "100%" }}>
                    <Button colorScheme="yellow" onClick={update}>{load ? "Updating..." : "Update"}</Button>
                    <Button colorScheme="orange" onClick={close}>Close</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

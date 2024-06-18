import {Button} from '@chakra-ui/react';
import Modal from 'react-bootstrap/Modal';

export const StudentUpdateModel = ({show,close,data}) => {
    const Update=()=>{}
    return (
        <Modal show={show} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Update <strong>{data?.Name}</strong> Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input value={data?.Name}/><br/>
                <input value={data?.Gmail}/><br/>
                <input value={data?.Branch}/><br/>
                <input value={data?.Number}/><br/>
                <input value={data?.Score}/><br/>
            </Modal.Body>
            <Modal.Footer>
                <div style={{display:'flex',justifyContent:'space-around',width:"100%"}}>
                <Button colorScheme="yellow" onClick={Update}>Update</Button>
                <Button colorScheme="orange" onClick={close}>Close</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
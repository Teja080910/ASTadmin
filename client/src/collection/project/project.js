import { Card, CardBody, CardFooter, CardHeader, Center, Heading, Link, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import "../cerdentials/signup.css";
import { Navbars } from "../nav&foot/nav";
export const Addproject = () => {
    const [name, sname] = useState();
    const [proname, sproname] = useState();
    const [gmail, sgmail] = useState();
    const [project, sproject] = useState();
    const toast = useToast()
    const Project = async () => {
        if (name && proname && gmail && project) {
            document.getElementById("projectsubmit").innerHTML = "Please wait....."
            await axios.post(process.env.REACT_APP_database + "/project", { name, gmail, proname, project })
                .then((res) => {
                    console.log(res)
                    if (res.data) {
                        document.getElementById("projectsubmit").innerHTML = "Submitted.."
                        window.location = '/projects';
                    }
                    else if (res.data.message === "Not found") {
                        toast({ title: "Gmail not found", status: "error", position: "bottom-left", isClosable: true })
                        document.getElementById("projectsubmit").innerHTML = "Try again.."
                    }
                })
                .catch((e) => console.log(e))
        }
        else {
            toast({ title: "Fill all details", status: "warning", position: "bottom-left", isClosable: true })
        }
    }
    return (
        <>
            <Navbars />

            <div className=" register-container container">
                <div className="register-header">
                    <b>Project upload</b>
                </div>
                <div className="form-group">
                    <label>Student Name:</label>
                    <input className="form-control" type="text" placeholder="Name of the student" onChange={(e) => sname(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Gmail:</label>
                    <input className="form-control" type="email" placeholder="Email of the student" onChange={(e) => sgmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Projectname Name:</label>
                    <input className="form-control" type="text" placeholder="Project Name" onChange={(e) => sproname(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Project Link</label>
                    <input className="form-control" type="link" placeholder="Your project link" onChange={(e) => sproject(e.target.value)} />
                </div>
                <div className="form-group" style={{ display: "flex", justifyContent: "center" }}>
                    <button id="projectsubmit" type="submit" onClick={Project}><b>Upload project</b></button>
                </div>
            </div>

        </>
    )
}





export const Projects = () => {
    const [data, sdata] = useState([]);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const [del, sdel] = useState();
    const [msg, smsg] = useState();
    const [name, sname] = useState();
    const [gmail, sgmail] = useState();
    const [like, slike] = useState();
    const mail = sessionStorage.student;
    const shareViaWhatsApp = (content) => {
        const text = encodeURIComponent(content);
        window.open(`https://wa.me/?text=${text}`);
    };

    const shareViaTelegram = (content) => {
        const text = encodeURIComponent(content);
        window.open(`https://telegram.me/share/url?url=&text=${text}`);
    };

    const handleShareByEmail = (subject, body) => {
        const subjectEncoded = encodeURIComponent(subject);
        const bodyEncoded = encodeURIComponent(body);
        window.location.href = `mailto:?subject=${subjectEncoded}&body=${bodyEncoded}`;
    };
    const Login = async () => {
        axios.post(process.env.REACT_APP_database + "/student/" + gmail)
            .then((res) => {
                if (res.data.Reg_No === name) {
                    sessionStorage.student = gmail;
                    setShow(false)
                }
                else {
                    smsg("Password incorrect")
                }
            })
            .catch((e) => console.log(e))
    }
    const Like = async () => {
        await axios.post(process.env.REACT_APP_database + "/like", { del })
            .then((res) => {
            })
            .catch((e) => console.log(e))
    }
    const Unlike = async () => {
        await axios.post(process.env.REACT_APP_database + "/unlike", { del })
            .then((res) => {
            })
            .catch((e) => console.log(e))
    }
    const Delete = async () => {
        if (prompt("Enter Project Name") === del.val.Projectname) {
            await axios.post(process.env.REACT_APP_database + "/delete", { del })
                .then((res) => {
                })
                .catch((e) => console.log(e))
        }
    }
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/projects")
            .then((result) => {
                sdata(result.data);
            })
            .catch((e) => console.log(e))
    },[data])
    return (
        <>
            <Navbars />
            <div className='projectbg'>
                <div className='projectname'>Projects</div>
                {
                    data.map((dat) =>
                    (
                        <>
                            <p style={{ display: 'flex', justifyContent: 'center', color: 'green', marginTop: '3%' }}><h1>{dat.Name}</h1>{sessionStorage.student === dat.Gmail ? <Button className='stulogout' onClick={() => sessionStorage.removeItem("student")}>Logout</Button> : <b />}</p>
                            <SimpleGrid spacing={4} className='simplegrid' templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                                {
                                    dat.Projects.map((val, index) =>
                                    (
                                        <Card className='card'>
                                            <Center>
                                                <CardHeader>
                                                    <Heading style={{ color: 'blue' }}>{val.Projectname}</Heading>
                                                </CardHeader>
                                            </Center>
                                            <Center>
                                                <CardBody>
                                                    <Text>
                                                        <Link className='link' target='_blank' href={val.Projectlink}><h4>View Here</h4></Link>
                                                    </Text>
                                                </CardBody>
                                            </Center>
                                            <Center>
                                                <CardFooter>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <p>
                                                            <Button onClick={() => {
                                                                val?.Likes?.includes(sessionStorage.student) ? Unlike() : Like();
                                                                sdel({ dat, mail, index });
                                                            }}>
                                                                {val?.Likes?.includes(sessionStorage.student) ? (
                                                                    <FontAwesomeIcon icon={faHeart} style={{ color: "green" }} />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faHeart} style={{ color: "black" }} />
                                                                )}
                                                            </Button>
                                                        </p>

                                                        <h3 style={{ position: 'absolute', marginTop: '5%', color: 'orangered' }}>
                                                            {val.Likes ? Object.keys(val.Likes).length : <b />}
                                                        </h3>
                                                    </div>
                                                </CardFooter>
                                                <div className="hidden" id={`${val['shortCode']}${val['originalUrl']}`}>
                                                    <CardFooter className={("text-center mt-5 flex justify-around")} >
                                                        <button onClick={() =>
                                                            shareViaWhatsApp(val["originalUrl"])}><FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: "5px", width: "25px", color: "green" }} /></button>
                                                        <button onClick={() =>
                                                            shareViaTelegram(val["originalUrl"])}><FontAwesomeIcon icon={faTelegram} style={{ fontSize: "5px", width: "25px", color: "blue" }} /></button>
                                                        <button onClick={() =>
                                                            handleShareByEmail("this is link", val["originalUrl"])}><FontAwesomeIcon icon={faMailBulk} style={{ fontSize: "5px", width: "25px", color: "blue" }} /></button>
                                                    </CardFooter>
                                                </div>
                                            </Center>
                                            <Center>
                                                {
                                                    sessionStorage.student === dat.Gmail ?
                                                        <CardFooter>
                                                            <Button onClick={Delete} onClickCapture={() => sdel({ dat, val })}>Delete</Button>
                                                        </CardFooter> : <b />
                                                }
                                            </Center>
                                        </Card>
                                    ))
                                }
                            </SimpleGrid>
                        </>
                    ))
                }
            </div>


            <div>
                {
                    !sessionStorage.student ?
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Login Form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Gmail"
                                            autoFocus
                                            autoComplete='true'
                                            onChange={(e) => sgmail(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            onChange={(e) => sname(e.target.value.toUpperCase())}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <h6>{msg}</h6>
                                <Button variant="primary" onClick={Login}>
                                    Login
                                </Button>
                            </Modal.Footer>
                        </Modal> : <b />
                }
            </div>
        </>
    )
}

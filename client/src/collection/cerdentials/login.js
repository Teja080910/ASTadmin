import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
import { useToast } from "@chakra-ui/react";
const Login = () => {
    const [dat, sdat] = useState([]);
    const [atnd, satnd] = useState([]);
    const [select, sselect] = useState([]);
    const [year, syear] = useState([]);
    const [otp, sotp] = useState([]);
    const [tat, stat] = useState([]);
    const [x, sx] = useState(1);
    const min = Math.pow(10, 3);
    const max = Math.pow(10, 4) - 1;
    const [code, scode] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const date = new Date();
    const toast=useToast()
    const Attend = async () => {
        try {
            if (parseInt(otp) === code) {
                const responce = await axios.post(process.env.REACT_APP_database + "/student/" + atnd.Gmail)
                {
                    if (responce.data) {
                        console.log(responce.data)
                        if (x === 1) {
                            atnd.Num = (parseInt(responce.data.Num) + 1);
                            sx(2);
                            const responce1 = await axios.post(process.env.REACT_APP_database + "/loginstudent/" + atnd.Gmail + "/" + atnd.Num + "/" + date.toDateString())
                            {
                                if (responce1) {
                                    toast({title:atnd.Reg_No + " Attend",status:"success",position:"top", isClosable:true})
                                    setTimeout(()=>window.location.reload(1),1000)
                                }
                                else
                                {
                                    toast({title:"Try again",status:"error",position:"bottom-left", isClosable:true})   
                                }
                            }
                        }
                    }
                    else {
                        toast({title:"Student not found",status:"error",position:"bottom-left", isClosable:true})
                    }
                }
            }
            else {
                toast({title:"Invalid code",status:"error",position:"bottom-left", isClosable:true})
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const Send = async () => {
        let OTP = Math.floor(Math.random() * (max - min + 1)) + min;
        scode(OTP);
        let ebody = `
    <p ><h2 style="text-align: center;">This <b>OTP</b> came from AST</h2></p>
    <p style="text-align: center;">
        <b>Name::</b> ${atnd.Name}<br/>
        <b>Gmail::</b> ${atnd.Gmail}<br/>
    </p>
    <p >
    <h1 style="text-align: center;">Code:: ${OTP}</h1>
    </p>
    <br/>
    <p >
        <h2 style="color:green;">Welcome to ${parseInt(atnd.Num) + 1}th day</h2>
    </p>
    <p style="color:blue;">
    Check Your attendance and submission of your work<br/>
    <h3>https://asteam-attendance.vercel.app/scrummaster</h3>
    </p>
`

        window.Email.send({
            SecureToken: "f9ae35e5-c8b8-4822-8c5c-1fb1bdd4d0e4",
            To: (atnd.Gmail),
            From: "aolsrkr2002@gmail.com",
            Subject: "Daily Attendace Code",
            Body: ebody
        }).then(
            message => message === "OK" ? document.getElementById('otps').style.display = 'block' : toast({title:message,status:"error",position:"bottom-left", isClosable:true})
        )
        .catch((e)=>console.log(e))
    }
    const Complete = () => {
        sessionStorage.removeItem('name');
    }
    const Year = () => {
        sessionStorage.year = year;
        window.location.reload(1);
    }
    const DeleteStudent = () => {
        document.getElementById('password').style.display = "block";
    }
    const Delete = () => {
        axios.post(process.env.REACT_APP_database + "/admincheck/" + sessionStorage.gmail + "/" + otp)
            .then((res) => {
                console.log(res)
                if (res.data) {
                    axios.post(process.env.REACT_APP_database + "/deletestudent/" + atnd)
                        .then((res) => {        
                            if (res) {
                                window.location.reload(3);
                            }
                        })
                        .catch((e) => console.log(e))
                }
                else {
                    toast({title:"Enter correct password",status:"error",position:"bottom-left", isClosable:true})
                }
            })
            .catch((e) => console.log(e))
    }
    const Register = () => {
        sessionStorage.removeItem('yoga');
    }
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/students")
            .then((result) => {
                sdat((result.data.sort((a, b) => a.Year - b.Year)));
            })
        axios.post(process.env.REACT_APP_database + "/totaldays")
            .then((result) => {
                stat(result.data)
            })
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [dat])
    return (
        <>
            <Navbars />
            <div className="otp" id='otps'>
                <input type="number" align="center" placeholder="Enter OTP" onChange={(e) => { sotp(e.target.value) }}></input>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={Attend}><b>Submit</b></button>
                    <Button style={{ backgroundColor: 'red' }} onClick={() => document.getElementById("otps").style.display = "none"}><b>X</b></Button>
                </div>
            </div>
            <div className="otp" id='password'>
                <input type="password" align="center" placeholder="Enter Password" onChange={(e) => { sotp(e.target.value) }}></input>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={Delete}><b>Submit</b></button>
                    <Button style={{ backgroundColor: 'red' }} onClick={() => document.getElementById("password").style.display = "none"}><b>X</b></Button>
                </div>
            </div>
            <div className="clgname">SRKREC CSE DEPT</div>
            <div className="yearbtns">
                <Button className="yearbtnsink" onClick={Year} onClickCapture={(e) => { syear(1) }}><b>1st Year</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: 'red' }} onClick={Year} onClickCapture={(e) => { syear(2) }}><b>2nd Year</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: 'blueviolet' }} onClick={Year} onClickCapture={(e) => { syear(3) }}><b>3rd Year</b></Button>
                <Button className="yearbtnsink" style={{ backgroundColor: 'green' }} onClick={Year} onClickCapture={(e) => { syear(4) }}><b>4th Year</b></Button>
            </div>
            <br />
            <div>
                <input id='search' value={select} type="text" autoComplete="none" className="studentcheck" placeholder="Enter User mail or name" onChange={(e) => sselect(e.target.value)}></input>
                <table className="studetail">
                    {
                        isLoading ?
                            <tr>
                                <td style={{ backgroundColor: 'white', textAlign: 'center' }} colSpan={5}>
                                    <h5>Loading....</h5>
                                </td>
                            </tr> :
                            <>
                                <thead>
                                    <tr>
                                        <td style={{ height: '6vh' }} colSpan={6}><Link to='/register' onClick={Register} className="signup">Register</Link></td>
                                    </tr>
                                    <tr style={{ color: 'blueviolet' }}>
                                        <td colSpan={2}><b>Total days::</b>{tat.Days}</td>
                                        <td colSpan={4}><b>scrummaster::</b>{tat.Scum}</td>
                                    </tr>
                                    <tr>
                                        <th>SNO</th>
                                        <th>REGISTER NUMBER</th>
                                        <th>NAME</th>
                                        <th>CLICK</th>
                                        <th>STREAK</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {
                                    dat.filter(user => (user.Reg_No).toLowerCase().includes(select) || (user.Reg_No).toUpperCase().includes(select) || (user.Name).toUpperCase().includes(select) || (user.Name).toLowerCase().includes(select)).map((x, index) => (
                                        <>
                                            <>
                                                <tr>
                                                    {
                                                        x.Year === sessionStorage.year ?
                                                            <>
                                                                <td style={{ height: '7vh' }}>{index + 1}</td>
                                                                <td>{x.Reg_No.toUpperCase()}</td>
                                                                <td>{x.Name.toUpperCase()}</td>
                                                                <td>
                                                                    {
                                                                        x.Login !== date.toDateString() ?
                                                                            <button style={{ backgroundColor: "#3498db", borderRadius: "8px", border: "none", color: "white", padding: "5px" }} onClick={Send} onClickCapture={(e) => { satnd(x) }}><b>Attend</b></button> : <b></b>
                                                                    }
                                                                </td>
                                                                <td>

                                                                    <div style={{ position: "relative" }}>
                                                                        <div class="main-streak-text"><b >{(parseInt(x.Num))}</b></div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button onClick={DeleteStudent} onClickCapture={(e) => { satnd(x.Gmail) }} style={{ backgroundColor: "red", color: 'white', border: 'none', borderRadius: "5px" }}>X</button>
                                                                </td>

                                                            </> : <></>
                                                    }
                                                </tr>
                                            </>
                                        </>
                                    ))}
                            </>
                    }
                </table>
                <div>

                    <Button onClick={Complete} to='/' className="complteday"><b>Complete Day</b></Button>
                </div>
            </div>
        </>
    )

}
export default Login;

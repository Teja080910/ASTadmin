import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Actions } from "../../actions/actions";
import { Navbars } from "../nav&foot/nav";
import { SednOTP } from "./sendotp";

const Login = () => {
    const [dat, setDat] = useState([]);
    const [data, setData] = useState();
    const [atnd, setAtnd] = useState();
    const [select, setSelect] = useState("");
    const [show, setShow] = useState(false);
    const [otp, setOtp] = useState();
    const [tat, setTat] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const date = new Date();
    const toast = useToast();

    const handleSend = async (regd) => {
        try {
            const res = await Actions.SendOtp(regd);
            if (res?.data?.message) {
                setData(res?.data);
                toast({ title: res.data.message, status: "success", position: "top-right", isClosable: true });
            } else {
                toast({ title: res.data.error, status: "error", position: "bottom-right", isClosable: true });
            }
        } catch (error) {
            console.error(error);
            toast({ title: "Failed to send OTP", status: "error", position: "bottom-right", isClosable: true });
        }
    };

    const handleYearSelect = (year) => {
        sessionStorage.setItem('year', year);
        window.location.reload();
    };

    const handleDeleteStudent = () => {
        document.getElementById('password').style.display = "block";
    };

    const handleDelete = async () => {
        try {
            const adminCheckRes = await axios.post(`${process.env.REACT_APP_database}/admincheck/${sessionStorage.gmail}/${otp}`);
            if (adminCheckRes.data) {
                await axios.post(`${process.env.REACT_APP_database}/deletestudent/${atnd}`);
                window.location.reload();
            } else {
                toast({ title: "Enter correct password", status: "error", position: "bottom-left", isClosable: true });
            }
        } catch (error) {
            console.error(error);
            toast({ title: "Failed to delete student", status: "error", position: "bottom-left", isClosable: true });
        }
    };

    const handleRegister = () => {
        sessionStorage.removeItem('yoga');
    };

    const fetchData = async () => {
        try {
            const studentRes = await axios.post(`${process.env.REACT_APP_database}/students`);
            // const filterdata=studentRes.data.filter(student=>student?.Num!==undefined)
            const storeddata = studentRes.data.sort((a, b) => b?.Num - a?.Num)
            setDat(storeddata);
            const totalDaysRes = await axios.post(`${process.env.REACT_APP_database}/totaldays`);
            setTat(totalDaysRes.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            toast({ title: "Failed to fetch data", status: "error", position: "bottom-right", isClosable: true });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbars />
            <SednOTP atnd={atnd} isOpen={show} onClose={() => setShow(false)} data={data} refresh={fetchData} />
            <div className="otp" id='password'>
                <input
                    type="password"
                    align="center"
                    placeholder="Enter Password"
                    onChange={(e) => setOtp(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={handleDelete}><b>Submit</b></button>
                    <Button
                        style={{ backgroundColor: 'red' }}
                        onClick={() => document.getElementById("password").style.display = "none"}
                    >
                        <b>X</b>
                    </Button>
                </div>
            </div>
            <div className="clgname">SRKREC CSE DEPT</div>
            <div className="yearbtns">
                <Button className="yearbtnsink" onClick={() => handleYearSelect(1)}><b>1st Year</b></Button>
                <Button className="yearbtnsink" bg={"red.300"} onClick={() => handleYearSelect(2)}><b>2nd Year</b></Button>
                <Button className="yearbtnsink" bg={"blue.300"} onClick={() => handleYearSelect(3)}><b>3rd Year</b></Button>
                <Button className="yearbtnsink" bg={"green.300"} onClick={() => handleYearSelect(4)}><b>4th Year</b></Button>
            </div>
            <br />
            <div>
                <input
                    type="text"
                    autoComplete="none"
                    className="studentcheck"
                    placeholder="Enter User mail or name"
                    onChange={(e) => setSelect(e.target.value)}
                />
                <table id="studetail">
                    {isLoading ? (
                        <tr>
                            <td style={{ backgroundColor: 'white', textAlign: 'center' }} colSpan={5}>
                                <h5>Loading....</h5>
                            </td>
                        </tr>
                    ) : (
                        <>
                            <thead>
                                <tr>
                                    <td style={{ height: '6vh' }} colSpan={6}>
                                        <Link to='/register' onClick={handleRegister} className="signup">Register</Link>
                                    </td>
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
                            <tbody>
                                {dat?.filter(user =>
                                    user?.Reg_No.toLowerCase().includes(select?.toLowerCase()) ||
                                    user?.Name.toLowerCase().includes(select?.toLowerCase())
                                )?.map((x, index) => (
                                    x.Year === sessionStorage.year && (
                                        <tr key={x.Reg_No}>
                                            <td style={{ height: '7vh' }}>{index + 1}</td>
                                            <td>{x?.Reg_No.toUpperCase()}</td>
                                            <td>{x?.Name.toUpperCase()}</td>
                                            <td>
                                                {x.Login !== date.toDateString() && (
                                                    <button
                                                        style={{ backgroundColor: "#3498db", borderRadius: "8px", border: "none", color: "white", padding: "5px" }}
                                                        onClick={() => { handleSend(x?.Reg_No); setShow(true); setAtnd(x?.Reg_No); }}
                                                    >
                                                        <b>Attend</b>
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                <div style={{ position: "relative" }}>
                                                    <div className="main-streak-text"><b>{parseInt(x?.Num)}</b></div>
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={handleDeleteStudent}
                                                    onClickCapture={() => setAtnd(x.Gmail)}
                                                    style={{ backgroundColor: "red", color: 'white', border: 'none', borderRadius: "5px" }}
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </>
                    )}
                </table>
            </div>
        </>
    );
};

export default Login;

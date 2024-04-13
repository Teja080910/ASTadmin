// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// const Sample = () => {
//     const nav = useNavigate();
//     const [logname, setName] = useState("");
//     const [cpassword, setPassword] = useState("");
//     const [isSignup, setIsSignup] = useState(false);
//     const [check, setCheck] = useState("");
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [signupPassword, setSignupPassword] = useState("");
//     const [otp, setOtp] = useState("");
//     const [showOTPInput, setShowOTPInput] = useState(false);

//     const handleLogin = async () => {
//         try {
//             const result = await axios.get("http://localhost:8000/login/" + logname + "/" + cpassword);
//             if (result.data) {
//                 localStorage.sname = result.data.username;
//                 localStorage.gmail = logname;
//                 nav('/screen');
//             } else {
//                 alert("Incorrect name or password");
//             }
//         } catch (error) {
//             console.error(error);
//             alert("An error occurred. Please try again.");
//         }
//     };

//     const handleCheckAvailability = async () => {
//         try
//         {
//             const response = await axios.get("http://localhost:8000/check/" + username);
//         const response1 = await axios.get("http://localhost:8000/check1/" + email);
//         if (response.data) {
//             setCheck("User Name is already exists");
//         } else if (response1.data) {
//             setCheck("E-mail is already exists");
//         } else {
//             let OTP = '';
//             for (let i = 0; i < 4; i++) {
//                 OTP += digits[Math.floor(Math.random() * 10)];
//             }

//             window.Email.send({
//                 SecureToken: "23ea1404-dbb6-4dd6-9fb2-71f755191f2e",
//                 To: email,
//                 From: "mudundisowmya999@gmail.com",
//                 Subject: "Student Platform",
//                 Body: `Hi<br/>Your one-time password is:${OTP}<br/>Don't tell anyone`
//             });

//             setShowOTPInput(true);
//             setOtp(OTP);
//         }
//         }
//         catch(e)
//         {
//             console.log(e)
//         }
//     }

//     const handleRegister = async () => {
//         if (otp === otp) {
//             const response = await axios.post("http://localhost:8000/signup/" + username + "/" + email + "/" + cpassword);
//             if (response.data) {
//                 alert("Register Successfully");
//                 nav('/login');
//             }
//             else {
//                 alert("Invalid Details");
//             }
//         } else {
//             alert("Invalid OTP");
//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isSignup) {
//             handleCheckAvailability();
//         } else {
//             handleLogin();
//         }
//     };
//     var digits = '0123456789';
//     return (
//         <>
//         <Header/>
//             <div className="ex">
//                 <div className="ex2">
//                     <div className="login-container">
//                         <form className="login-form" onSubmit={handleSubmit}>
//                         <div className="ex1">
//                            <div> <button onClick={() => setIsSignup(false)} className="mainbuttons"><b>Login</b></button></div>
//                            <div> <button onClick={() => setIsSignup(true)} className="mainbuttons"><b>Signup</b></button></div>
//                         </div>
//                             {isSignup && (
//                                 <h4><marquee><b>{check}</b></marquee></h4>
//                             )}
//                             {isSignup && (
//                                 <div className="input-group">
//                                     <label htmlFor="username">User Name</label>
//                                     <input
//                                         type="text"
//                                         id="username"
//                                         placeholder="Enter Your UserName"
//                                         onChange={(e) => setUsername(e.target.value)}
//                                     />
//                                 </div>
//                             )}
//                             {isSignup && (
//                                 <div className="input-group">
//                                     <label htmlFor="email">Email</label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         placeholder="Enter your email"
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </div>
//                             )}
//                             {isSignup && (
//                                 <div className="input-group">
//                                     <label htmlFor="password">Password</label>
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         placeholder="Enter your password"
//                                         onChange={(e) => setSignupPassword(e.target.value)}
//                                     />
//                                 </div>
//                             )}
//                             {!isSignup && (
//                                 <div className="input-group">
//                                     <label htmlFor="text">User Name / Email</label>
//                                     <input
//                                         type="text"
//                                         id="text"
//                                         placeholder="Enter Your UserName / Email"
//                                         onChange={(e) => setName(e.target.value)}
//                                     />
//                                 </div>
//                             )}
//                             {!isSignup && (
//                                 <div className="input-group">
//                                     <label htmlFor="password">Password</label>
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         placeholder="Enter your password"
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                 </div>
//                             )}
//                             <button type="submit">{isSignup ? "Register" : "Login"}</button><br/><br/>
//                             {showOTPInput && (
//                                 <div className="input-group">
//                                     <label htmlFor="otp">OTP</label>
//                                     <input
//                                         type="text"
//                                         id="otp"
//                                         placeholder="Enter OTP"
//                                         onChange={(e) => setOtp(e.target.value)}
//                                     />
//                                     <button type="button" onClick={handleRegister}>
//                                         Verify OTP
//                                     </button>
//                                 </div>
//                             )}
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <Footer/>
//         </>
//     );
// };

// export default Sample;


import {Button} from "@mui/material"

const data = [
    {
        id: 1,
        question: "Given a string s, return the longest palindromic substring in s",
        input1: "s ='babad'",
        output1: " 'bab'  ",
        explain: "'aba' is also a valid answer."
    },
    {
        id: 2,
        question: "2222 string s, return the longest palindromic substring in s",
        input1: "s ='babad'",
        output1: " 'bab'  ",
        explain: "'aba' is also a valid answer."
    },
    {
        id: 3,
        question: "3333a string s, return the longest palindromic substring in s",
        input1: "s ='babad'",
        output1: " 'bab'  ",
        explain: "'aba' is also a valid answer."
    },
    {
        id: 4,
        question: "44444 a string s, return the longest palindromic substring in s",
        input1: "s ='babad'",
        output1: " 'bab'  ",
        explain: "'aba' is also a valid answer."
    },
    {
        id: 5,
        question: "5555 a string s, return the longest palindromic substring in s",
        input1: "s ='babad'",
        output1: " 'bab'  ",
        explain: "'aba' is also a valid answer."
    }
]

console.log(data)

const Left = () => {
    if(!localStorage.i)
    {
        localStorage.i=0
    }
    console.log(localStorage.i)
    return (
        <>
            <div className='left'>
                {console.log(data[localStorage.i].question)}
                <h2>{data[localStorage.i].id}</h2>
                <h2>DESCRIPTION:</h2>
                <h3>{data[localStorage.i].question}</h3>
                <h2>example 1:</h2>
                <h3>Input:{data[localStorage.i].input1}</h3>
                <h3>Output:{data[localStorage.i].output1}</h3>
                <h3>Exaplaination:{data[localStorage.i].explain}</h3>
                <h2>example 2:</h2>
                <h2>{data[localStorage.i].example2}</h2>
            </div>
            <div>
                <div className="secondhead">
                    <h1 className="name">CODE ARENA</h1>
                    <header className="questionNoContainer">
                        <button className="questionNo" onClick={() => {localStorage.i = 1;window.location.reload(5000)}} >1</button>
                        <button className="questionNo" onClick={() => localStorage.i = 2} >2</button>
                        <button onClick={() => localStorage.i = 3} className="questionNo">3</button>
                        <button onClick={() => localStorage.i = 4} className="questionNo">4</button>
                        <button onClick={() => localStorage.i = 5} className="questionNo">5</button>
                        <Button variant="contained" disableElevation>
                            BACK
                        </Button>
                        <Button variant="contained" disableElevation>
                            NEXT
                        </Button>
                    </header>
                </div>
            </div>

        </>
    )
}

export default Left
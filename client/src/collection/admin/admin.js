import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../admin/admin.css';
import { Navbars } from '../nav&foot/nav';
export const Admin=()=>{
    const nav=useNavigate();
    const[gmail,setgmail]=useState([]);
    const[password,setpassword]=useState([]);
    const date=new Date();
    const time=new Date().toLocaleTimeString();
    const Submit=async()=>{
        try{
            const responce=await axios.post("https://attendance-339a.onrender.com/admincheck/"+gmail+"/"+password)
            {
                if(responce.data)
                {
                 if (responce.data.Dates !== date.toDateString())
                 {
                    const res1=await axios.post("https://attendance-339a.onrender.com/totaldays")
                    {
                        if(res1.data)
                        {
                            if (res1.data.Date !== date.toDateString())
                            {
                                let tdays = parseInt(res1.data.Days) + 1;
                                const res = await axios.post("https://attendance-339a.onrender.com/updateadmin/"+gmail + "/" + date.toDateString() + "/" + tdays)
                                {
                                    if (res)
                                    {
                                        sessionStorage.name = gmail;
                                        alert("Admin sucessfully logged in Today");
                                        if ((time <= "19:20:00 pm" && time >="17:00:00 pm") || (time <= "7:20:00 pm" && time >="5:00:00 pm")) {
                                            nav("/login")
                                            window.location.reload(1);
                                        }
                                        else {
                                            alert("Time out");
                                            nav("/");
                                        }
                                    }
                                    else {
                                        alert("Try again");
                                    }
                                }
                            }
                            else
                            {
                                sessionStorage.name=gmail;
                                alert("Admin 2 sucessfully logged in Today");
                                if ((time <= "19:20:00 pm" && time >="17:00:00 pm") || (time <= "7:20:00 pm" && time >="5:00:00 pm")) {
                                    nav("/login")
                                    window.location.reload(1);
                                }
                                else {
                                    alert("Time out");
                                    nav("/");
                                }
                            }
                    }
                     }
                 }
                 else
                 {
                     sessionStorage.name=gmail;
                     sessionStorage.removeItem('yoga');
                     alert("Admin sucessfully logged in again");
                     if ((time <= "19:20:00 pm" && time >="17:00:00 pm") || (time <= "7:20:00 pm" && time >="5:00:00 pm"))
                     {
                         window.location="login";
                     }
                     else {
                         alert("Time out");
                         nav("/");
                     }
                 }
                }
                else
                {
                 alert("Please register as admin");
                }   
            }
    }
    catch(e)
    {
       console.log(e)
    }
    }
    return(
    <>
    <Navbars/>
        <div className="login-container">
      <h1 className="heading">Attendance </h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="admin">Admin Gmail:</label>
          <input
            className="form-control"
            type="text"
            name="admin"
            id="admin"
            placeholder="Enter Admin Gmail"
            value={gmail}
            onChange={(e) => setgmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
        <button className="btn btn-primary admin-button" onClick={Submit}>
          Submit
        </button>
        </div>
      </div>
    </div>
    
        
    </>
    )
}



export const Adminreg=()=>
{
    const nav=useNavigate();
    const[gmail,setgmail]=useState([]);
    const[password,setpassword]=useState([]);
    const Submit=async()=>
    {
        const res=await axios.post("https://attendance-339a.onrender.com/admincheck/"+gmail+"/"+password)
        {
            if (res.data) {
                alert("Already Register")
            }
            else {
                if (await axios.post("https://attendance-339a.onrender.com/adminregi/" + gmail + "/" + password)) {
                    alert("Sucessfully Registered");
                    nav('/adminlogin')
                }
            }
        }
    }
    return(
        <>
        
    <div className="login-container">
      <h1 className="heading">Admin Register</h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="admin">Admin Gmail:</label>
          <input
            className="form-control"
            type="text"
            name="admin"
            id="admin"
            placeholder="Enter Admin Gmail"
            value={gmail}
            onChange={(e) => setgmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
        <button className=" admin-button"   onClick={Submit}>
          Add Admin
        </button>
        </div>
        </div>
        </div>
        </>
    )
}
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import {Navbars} from '../nav&foot/nav'
import { useNavigate } from "react-router-dom";
import '../admin/admin.css';
export const Admin=()=>{
    const nav=useNavigate();
    const[gmail,setgmail]=useState([]);
    const[password,setpassword]=useState([]);
    const date=new Date();
    const time=new Date().toLocaleTimeString();
    const Submit=async()=>{
        try{
            const responce=await axios.get("https://attendance-339a.onrender.com/admincheck/"+gmail+"/"+password)
            {
                if(responce.data)
                {
                 if (responce.data.Dates !== date.toDateString())
                 {
                    const res1=await axios.get("https://attendance-339a.onrender.com/totaldays")
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
                                        localStorage.name = gmail;
                                        alert("Admin sucessfully logged in Today");
                                        if (time <= "7:20:00 pm" && time >="5:00:00 pm") {
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
                                localStorage.name=gmail;
                                alert("Admin 2 sucessfully logged in Today");
                                if (time <= "7:20:00 pm" && time >="5:00:00 pm") {
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
                     localStorage.name=gmail;
                     localStorage.yoga='';
                     alert("Admin sucessfully logged in again");
                     if (time <= "7:20:00 pm" && time >="5:00:00 pm")
                     {
                         nav("/login")
                         window.location.reload(1);
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
        <div className="log1">
        <h1 className="h">PGSQL with React.js</h1><br/>
        <input className="inwidth" type="text" name="admin" id="admin" placeholder="Admin Gmail" onChange={(e)=>setgmail(e.target.value)}/><br/><br/>
        <input className="inwidth" type="password" name="password" id="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)}/><br/><br/>
        <button className="bwidth" onClick={Submit}>Submit</button>
        </div>
        <div className="container-1 container">
        <h2>Admin Login</h2>
          <div className="form-group">
            <label>Email address:</label>
            <input  className="form-control" type="email" name="admin" id="admin" placeholder="Admin Gmail" onChange={(e)=>setgmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input  className="form-control" type="password" name="password" id="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} />
          </div>
          <div className="button">
            <button type="submit" className="btn btn-success"  onClick={Submit}>Login</button>
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
        const res=await axios.get("https://attendance-339a.onrender.com/admincheck/"+gmail+"/"+password)
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
        <div className="log1">
            <h1 className="h"></h1>
        <input className="inwidth" type="text" name="admin" id="admin" placeholder="Admin Gmail" onChange={(e)=>setgmail(e.target.value)}/><br/><br/>
        <input className="inwidth" type="password" name="password" id="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)}/><br/><br/>
        <button className="bwidth" onClick={Submit}>Submit</button>
        </div>
        </>
    )
}
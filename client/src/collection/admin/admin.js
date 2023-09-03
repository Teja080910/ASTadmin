import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
export const Admin=()=>{
    const nav=useNavigate();
    const[gmail,setgmail]=useState([]);
    const[password,setpassword]=useState([]);
    const date=new Date();
    const Submit=async()=>{
        try{
            const responce=await axios.get("https://attendance-339a.onrender.com/admincheck/"+gmail+"/"+password)
            {
                if(responce.data)
                {
                 if (responce.data.Dates !== date.toDateString())
                 {
                    const res1=await axios.get("https://attendance-339a.onrender.com/totaldays/"+"AST")
                    {
                        console.log(res1)
                        if(res1.data)
                        {
                            let tdays = parseInt(res1.data.Days) + 1;
                            const res = await axios.post("https://attendance-339a.onrender.com/updateadmin/" + gmail + "/" + date.toDateString() + "/" + tdays)
                            {
                                if(res)
                                {
                                    localStorage.name = gmail;
                                    alert("Admin sucessfully logged in Today");
                                    nav("/login")
                                    window.location.reload(1);
                                }
                                else
                                {
                                    alert("Try again");
                                }
                        }
                    }
                     }
                 }
                 else
                 {
                     localStorage.name=gmail;
                     alert("Admin sucessfully logged in again");
                     nav('/login')
                     window.location.reload(1);
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
        <h1 className="h">MERN</h1><br/>
        <input className="inwidth" type="text" name="admin" id="admin" placeholder="Admin Gmail" onChange={(e)=>setgmail(e.target.value)}/><br/><br/>
        <input className="inwidth" type="password" name="password" id="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)}/><br/><br/>
        <button className="bwidth" onClick={Submit}>Submit</button>
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
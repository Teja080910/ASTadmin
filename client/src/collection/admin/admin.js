import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "../nav&foot/nav";
export const Admin=()=>{
    const nav=useNavigate();
    const[gmail,setgmail]=useState([]);
    const[password,setpassword]=useState([]);
    const date=new Date();
    const Submit=async()=>{
        try{
            const responce=await axios.get("https://attendance-339a.onrender.com/admincheck/"+gmail+"/"+password)
           if(responce.data)
           {
            if (responce.data.Dates !== date.toDateString())
            {
                const responce2=await axios.post("https://attendance-339a.onrender.com/delete") && await axios.post("https://attendance-339a.onrender.com/updateadmin/"+username+"/"+date.toDateString())
                if (responce2.data)
                {
                    localStorage.name=username;
                    alert("Admin sucessfully logged in Today");
                    nav('/login')
                }
                else
                {
                    alert("Try again");
                }
            }
            else
            {
                localStorage.name=username;
                alert("Admin sucessfully logged in again");
                nav('/login')
            }
           }
           else
           {
            alert("Please register as admin");
           }
    }
    catch(e)
    {
       console.log(e)
    }
    }
    return(
    <>
    <Nav/>
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
        const responce=await axios.post("https://attendance-339a.onrender.com/adminregi/"+gmail+"/"+password)
        if(responce.data)
        {
            alert("Sucessfully Registered");
            nav('/adminlogin')
        }
    }
    return(
        <>
        <input className="inwidth" type="text" name="admin" id="admin" placeholder="Admin User Name" onChange={(e)=>setgmail(e.target.value)}/><br/><br/>
        <input className="inwidth" type="password" name="password" id="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)}/><br/><br/>
        <button className="bwidth" onClick={Submit}>Submit</button>
        </>
    )
}
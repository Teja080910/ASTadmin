import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
export const Admin=()=>{
    const nav=useNavigate();
    const[gmail,setgmail]=useState([]);
    const[password,setpassword]=useState([]);
    const [tdays,stdays]=useState([]);
    const date=new Date();
    const Submit=async()=>{
        try{
            
           if(await axios.get("https://attendance-339a.onrender.com/admincheck/"+gmail+"/"+password))
           {
            const responce=await axios.get("https://attendance-339a.onrender.com/admincheck/"+gmail+"/"+password)
            if (responce.data.Dates !== date.toDateString())
            {
                stdays(parseInt(responce.data.Days)+1);
                if (await axios.post("https://attendance-339a.onrender.com/delete")&&await axios.post("https://attendance-339a.onrender.com/savestudent/"+"project"+"/"+date) && await axios.post("https://attendance-339a.onrender.com/updateadmin/"+gmail+"/"+date.toDateString())+"/"+tdays)
                {
                    localStorage.name=gmail;
                    alert("Admin sucessfully logged in Today");
                    nav("/login")
                }
                else
                {
                    alert("Try again");
                }
            }
            else
            {
                localStorage.name=gmail;
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
        if(await axios.get("https://attendance-339a.onrender.com/admincheck/"+gmail+"/"+password))
        {
            alert("Already Register")
        }
        else
        {
            if(await axios.post("https://attendance-339a.onrender.com/adminregi/"+gmail+"/"+password))
            {
                alert("Sucessfully Registered");
                nav('/adminlogin')
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
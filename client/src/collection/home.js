import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Home=()=>{
    const nav=useNavigate();
    const[username,setusername]=useState([]);
    const[password,setpassword]=useState([]);
    const date=new Date();
    const Submit=async()=>{
        try{
            const responce=axios.get("https://attendance-339a.onrender.com/admincheck/"+username+"/"+password)
            if ((await responce).data.Dates !== date.toDateString())
            {
                const responce2=await axios.post("https://attendance-339a.onrender.com/delete") && await axios.post("https://attendance-339a.onrender.com/updateadmin/"+username+"/"+date.toDateString())
                if (responce2.data)
                {
                    alert("Admin sucessfully logged in Today");
                    localStorage.name=username;
                    nav('/login')
                }
                else
                {
                    alert("Try again");
                }
            }
            else
            {
                alert("Admin sucessfully logged in again");
                nav('/login')
            }
    }
    catch(e)
    {
       console.log(e)
    }
    }
    return(
    <>
        <div className="log1">
        <h1 className="h">MERN</h1><br/>
        <input className="inwidth" type="text" name="admin" id="admin" placeholder="Admin User Name" onChange={(e)=>setusername(e.target.value)}/><br/><br/>
        <input className="inwidth" type="password" name="password" id="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)}/><br/><br/>
        <button className="bwidth" onClick={Submit}>Submit</button>
        </div>
    </>
    )
}
export default Home;

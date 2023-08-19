import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "../nav&foot/nav";
const Home=()=>{
    const nav=useNavigate();
    const[username,setusername]=useState([]);
    const[password,setpassword]=useState([]);
    const date=new Date();
    const Submit=async()=>{
        try{
            const responce=await axios.get("https://attendance-339a.onrender.com/admincheck/"+username+"/"+password)
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
        <input className="inwidth" type="text" name="admin" id="admin" placeholder="Admin User Name" onChange={(e)=>setusername(e.target.value)}/><br/><br/>
        <input className="inwidth" type="password" name="password" id="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)}/><br/><br/>
        <button className="bwidth" onClick={Submit}>Submit</button>
        </div>
    </>
    )
}
export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home=()=>{
    const nav=useNavigate();
    const[username,setusername]=useState([]);
    const[password,setpassword]=useState([]);
    const Submit=async()=>{
        try{
        const res=await axios.get("http://localhost:8000/admin/"+username+"/"+password)
        if(res)
        {
            const responce=await axios.post("http://localhost:8000/delete")
            if(responce.data)
            {
                nav('/login');
            }
        }
        else{
            alert("Invalid Details");
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
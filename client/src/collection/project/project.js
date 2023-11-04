import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
import "../cerdentials/signup.css";
export const Addproject=()=>
{
    const [name,sname]=useState([]);
    const [project,sproject]=useState([]);
    const nav=useNavigate();
    const Project=async()=>
    {
        try
        {
            await axios.post("https://attendance-339a.onrender.com/project",{name,project})?alert("Sucessfully Submitted")&&nav('/projects'):alert("Try again");
        }
        catch(e)
        {
            console.log(e)
        }
    }
    return(
        <>
        <Navbars/>
        
        <div className=" register-container container">
            <div className="register-header">
        <b>Project upload</b>
        </div>
          <div className="form-group">
            <label>Student Name:</label>
            <input  className="form-control"  type="text" placeholder="Name of the student" onChange={(e)=>sname(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Project Link</label>
            <input  className="form-control" type="text" placeholder="Your project link" value={project} onChange={(e)=>sproject(e.target.value)} />
          </div>
          <div className="form-group" style={{display:"flex",justifyContent:"center"}}>
            <button type="submit"  onClick={Project}><b>Upload project</b></button>
          </div>
      </div>
     
        </>
    )
}
export const Projects=()=>
{
    const [data,sdata]=useState([]);
    useEffect(()=>
    {
        axios.post("https://attendance-339a.onrender.com/projects")
        .then((result)=>
        {
            sdata(result.data);
        })
    })
    return(
        <>
        <Navbars/>
       {
        data.map((dat)=>
        (
            <div>
                <Link className="projectlink" to={dat.Project}>{dat.Name}</Link>
            </div>
        ))
       }
        </>
    )
}
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../cerdentials/signup.css";
import { Navbars } from "../nav&foot/nav";
export const Addproject=()=>
{
    const [name,sname]=useState();
    const [proname,sproname]=useState();
    const [gmail,sgmail]=useState();
    const [project,sproject]=useState();
    const Project=async()=>
    {
        if(name && proname && gmail && project)
        {
            await axios.post("https://attendance-339a.onrender.com/project", { name, gmail, proname, project })
                .then((res) => {
                    if (res.data) {
                        alert("Sucessfully Submitted");
                        window.location = '/projects';
                    }
                    else {
                        alert("Gmail not found");
                    }
                })
                .catch((e) => console.log(e))
        }
        else
        {
            alert("Fill all details");
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
            <label>Gmail:</label>
            <input  className="form-control"  type="email" placeholder="Email of the student" onChange={(e)=>sgmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Projectname Name:</label>
            <input  className="form-control"  type="text" placeholder="Project Name" onChange={(e)=>sproname(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Project Link</label>
            <input  className="form-control" type="link" placeholder="Your project link" onChange={(e)=>sproject(e.target.value)} />
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
            <div className="projectlink-container">
                <Link className="projectlink" to={dat.Project}>{dat.Name}</Link>
            </div>
        ))
       }
        </>
    )
}
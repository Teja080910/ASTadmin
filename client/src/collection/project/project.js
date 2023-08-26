import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
export const Addproject=()=>
{
    const [name,sname]=useState([]);
    const [project,sproject]=useState([]);
    const nav=useNavigate();
    const Project=async()=>
    {
        try
        {
            await axios.post("https://attendance-339a.onrender.com/project/"+name+"/"+project)?alert("Sucessfully Submitted")&&nav('/projects'):alert("Try again");
        }
        catch(e)
        {
            console.log(e)
        }
    }
    return(
        <>
        <Navbars/>
        <div className="addproject">
        <tr>
            <td style={{width:'30%'}}>
            <label>Name::<input type="text" placeholder="Name" onChange={(e)=>sname(e.target.value)}></input></label>
            </td>
        </tr>
        <br/><br/>
        <tr>
            <td style={{width:'30%'}}>
            <label>Project::<input type="text" placeholder="project link" value={project} onChange={(e)=>sproject(e.target.value)}/></label>
            </td>
        </tr>
        <br/><br/>
        <button onClick={Project}>Submit</button>
        </div>
        </>
    )
}
export const Projects=()=>
{
    const [data,sdata]=useState([]);
    useEffect(()=>
    {
        axios.get("https://attendance-339a.onrender.com/projects")
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
                <Link className="projectlink" to={"https://"+dat.Project}>{dat.Name}</Link>
            </div>
        ))
       }
        </>
    )
}
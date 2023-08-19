import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../nav&foot/nav";
export const Addproject=()=>
{
    const [name,sname]=useState([]);
    const [project,sproject]=useState([]);
    const Project=async()=>
    {
        try
        {
         const responce=await axios.post("https://attendance-339a.onrender.com/project/"+name+"/"+project)
        if(responce.data)
        {
            alert("Sucessfully Submitted");
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
        <div className="addproject">
        <tr>
            <td style={{width:'30%'}}>
            <label>Name::<input type="text" placeholder="Name" onChange={(e)=>sname(e.target.value)}></input></label>
            </td>
        </tr>
        <br/><br/>
        <tr>
            <td style={{width:'30%'}}>
            <label>Project::<textPath><input type="text" placeholder="Github Repository" value={project} onChange={(e)=>sproject(e.target.value)}/></textPath></label>
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
        axios.get("http://attendance-339a.onrender.com/projects")
        .then((result)=>
        {
            sdata(result.data);
        })
    })
    return(
        <>
        <Nav/>
       {
        data.map((dat)=>
        (
            <tr>
            <td>
                <Link className="projectlink" to={"https://"+dat.Project}>{dat.Name}</Link>
            </td>
        </tr>
        ))
       }
        </>
    )
}
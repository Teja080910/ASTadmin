import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const Addproject=()=>
{
    const [name,sname]=useState([]);
    const [project,sproject]=useState([]);
    const Project=async()=>
    {
        try
        {
         const responce=await axios.post("http://localhost:8000/project/"+name+"/"+project)
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
        axios.get("http://localhost:8000/projects")
        .then((result)=>
        {
            sdata(result.data);
        })
    })
    return(
        <>
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
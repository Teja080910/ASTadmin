import axios from "axios";
import React, { useState } from "react";
export const Pro=()=>
{
    const [link,slink]=useState([]);
    const [name,sname]=useState([]);
    const Submit=async()=>
    {
        try
        {
            const res = await axios.post('http://localhost:8000/pro',{link,name})
            if(res)
            {
                alert("sucess");
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }
    return(
        <>
        <input type="text" placeholder="paste link" onChange={(e)=>{slink(e.target.value)}}></input>
        <input type="text" placeholder="name" onChange={(e)=>{sname(e.target.value)}}></input>
        <button onClick={Submit}>Submit</button>
        </>
    )
}
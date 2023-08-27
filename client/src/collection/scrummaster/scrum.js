import React, { useEffect, useState } from "react";
import { Navbars } from "../nav&foot/nav";
import axios from "axios";
export const Scrum=()=>
{
    const [set,sset]=useState(0);
    const Dailyatten=()=>
    {
        sset(1);
    }
    const Dailyworks=()=>
    {
        sset(2)
    }
    return(
       <>
        <Navbars/>
        <button className="scrmbtn" onClick={Dailyatten}>Daily Attendance</button>
        <button className="scrmbtn" onClick={Dailyworks}>Daily Work Submission</button>
        {
            set===1?<Dailattend/>:<b></b>
        }
        {
            set===2?<DailyWork/>:<b></b>
        }
       </>
        
    )
}

export const Dailattend=()=>
{
    const date=new Date();
    const [data,sdata]=useState([]);
    useEffect(()=>
    {
        axios.get("https://attendance-339a.onrender.com/students")
        .then((result)=>
        {
            sdata(result.data);
        })
    },[])
    return(
        <>
        <div className="dailyattend">
            <tr>
                <td width={"10%"}>Sno</td>
                <td width={"40%"}>Gmail</td>
                <td width={"50%"}>Regi_number</td>
            </tr>
            {
                data.map((x,index)=>
                (
                    x.Login===date.toDateString()?
                    <tr>
                        <td>{index+1}</td>
                        <td>{x.Gmail}</td>
                        <td>{x.Reg_No}</td>
                        <td>{x.Work}</td>
                    </tr>:<b></b>
                ))
            }
        </div>
        <button onClick={()=>window.print()}>Print</button>
        </>
    )
}

export const DailyWork=()=>
{
    const [name,sname]=useState([]);
    const [work,swork]=useState([]);
    const WorkSubmit=async()=>
    {
        try
        {
            const res=await axios.post("https://attendance-339a.onrender.com/worksubmit/"+name+"/"+work)
        {
            if(res)
            {
                alert("Sucessfully Submited");
            }
            else
            {
                alert("Try again");
            }
        }
        }
        catch(e)
        {
            console.log(e);
        }
    }
    return(
        <>
       <div className="dailywork">
       <tr>
            <td>
                <label for='smn'><b>Student gmail</b></label>
            </td>
            <td>
                <input type="text" id="smn" placeholder="Enter your name" onChange={(e)=>sname(e.target.value)}></input>
            </td>
        </tr>
        <tr>
            <td>
                <label for='work'><b>Today work</b></label>
            </td>
            <td>
                <textarea type="text" id="work" placeholder="Enter work with Module names" onChange={(e)=>swork(e.target.value)}></textarea>
            </td>
        </tr>
        <tr>
            <td colSpan={2}>
                <button onClick={WorkSubmit}>Submit</button>
            </td>
        </tr>
       </div>
        </>
    )
}
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
    const [data,sdata]=useState([]);
    useEffect(()=>
    {
        axios.get("https://attendance-339a.onrender.com/showsavestu")
        .then((result)=>
        {
            sdata(result.data);
        })
    },[])
    return(
        <>
        <div className="dailyattend">
            
        </div>
        </>
    )
}

export const DailyWork=()=>
{
    const [name,sname]=useState([]);
    const [date,sdate]=useState([]);
    const [work,swork]=useState([]);
    return(
        <>
       <div className="dailywork">
       <tr>
            <td>
                <label for='smn'>Scrum master name</label>
            </td>
            <td>
                <input type="text" id="smn" placeholder="Enter your name" onChange={(e)=>sname(e.target.value)}></input>
            </td>
        </tr>
        <tr>
            <td><label>Date</label></td>
            <td>
                <input type="date" onChange={(e)=>sdate(e.target.value)}></input>
            </td>
        </tr>
        <tr>
            <td>
                <label for='work'>Today work</label>
            </td>
            <td>
                <textarea type="text" id="work" placeholder="Enter work with Module names" onChange={(e)=>swork(e.target.value)}></textarea>
            </td>
        </tr>
        <tr>
            <td colSpan={2}>
                <button>Submit</button>
            </td>
        </tr>
       </div>
        </>
    )
}
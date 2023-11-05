import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Navbars } from "../nav&foot/nav";
import "../cerdentials/signup.css";
import "../scrummaster/scrum.css";
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
        <div className="form-group" style={{display:"flex",justifyContent:"space-around",marginTop:"30px"}}>
        <button  onClick={Dailyatten}>Daily Attendance</button>
        <button  onClick={Dailyworks}>Daily Work Submission</button>
        </div>
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
    const [tat,stat]=useState([]);
    const Scrm=async()=>
    {
        let scrm=prompt("Enter your pin");
        if(scrm==="AST@9899")
        {
            window.print();
        }
        else
        {
            scrm=prompt("Only For Scrum Masters Plaese Correct Pin");
        }
    }
    useEffect(()=>
    {
        axios.post("https://attendance-339a.onrender.com/students")
        .then((result)=>
        {
            sdata(result.data.sort((a, b) => a.Year- b.Year));
        })
        axios.post("https://attendance-339a.onrender.com/totaldays")
        .then((result)=>
        {
            stat(result.data)
        })
    },[])
    return(
        <>
        <div className="scrum-container">
            
           <table className="scrumtable">
            <tr>
                
                {
                    tat.Date===date.toDateString()?<th colSpan={5}><>Attendace Taken by Scrum master:: {tat.Scum}</></th>:<b></b>}
            </tr>
           <tr>
                <th>S.No</th>
                <th>Gmail</th>
                <th>Regd_number</th>
                <th>Year</th>
                <th>Work</th>
            </tr>
            {
                data.map((x,index)=>
                (
                    x.Login===date.toDateString()?
                   <>
                    <tr>
                        <td>{index+1}</td>
                        <td>{x.Gmail}</td>
                        <td>{x.Reg_No}</td>
                        <td>{x.Year}</td>
                        <td><b>{x.Date}</b><br/>{x.Work}</td>
                    </tr>
                    
                    
                   </>:<b></b>
                ))
            }
           </table>
           <div className="form-group-button" style={{display:"flex",justifyContent:"end",marginBottom:"10px"}}>
        <button  onClick={Scrm}>Print</button>

        </div>
        </div>
        </>
    )
}

export const DailyWork=()=>
{
    const [name,sname]=useState([]);
    const [work,swork]=useState([]);
    const date=new Date();
    const WorkSubmit=async()=>
    {
        try
        {
           const responce=await axios.post("https://attendance-339a.onrender.com/student/"+name)
           {
            if(responce.data)
            {
                const res=await axios.post("https://attendance-339a.onrender.com/worksubmit/"+name+"/"+date.toDateString()+"/"+work)
                {
                    if(res)
                    {
                        alert("Sucessfully Submited");
                        window.location.reload(2);
                    }
                    else
                    {
                        alert("Try again");
                    }
                }
            }
            else
            {
                alert("Gmail Not Found");
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
        <div className="register-container container">
        <div className="register-header">Daily Work Submission</div>
          <div className="form-group">
            <label>Student Email:</label>
            <input  className="form-control" type="text" id="smn" placeholder="Enter your gmail" onChange={(e)=>sname(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>Date:</label>   {date.toDateString()}
          </div>
          <div className="form-group">
            <label>Today Work:</label>
            <textarea  className="form-control" type="text" id="work" placeholder="Enter work with Module names" onChange={(e)=>swork(e.target.value)} />
          </div>
          <div className="form-group" style={{display:"flex",justifyContent:"center"}}>
            <button  className="btn btn-success"  onClick={WorkSubmit}>Submit Work</button>
          </div>
      </div>
        </>
    )
}
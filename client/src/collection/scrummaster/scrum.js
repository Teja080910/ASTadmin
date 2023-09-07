import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navbars } from "../nav&foot/nav";
import Table from 'react-bootstrap/Table';
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
        axios.get("https://attendance-339a.onrender.com/students")
        .then((result)=>
        {
            sdata(result.data.sort((a, b) => a.Year- b.Year));
        })
        axios.get("https://attendance-339a.onrender.com/totaldays")
        .then((result)=>
        {
            stat(result.data)
        })
    },[])
    return(
        <>
        <div className="dailyattend">
        <button className="scrmpntbtn" onClick={Scrm}>Print</button>
           <Table responsive>
            <tr>
                {
                    tat.Date===date.toDateString()?<td colSpan={5}><b>Attendace Taken by Scrm master:: {tat.Scum}</b></td>:<b></b>}
            </tr>
           <tr>
                <th>Sno</th>
                <th>Gmail</th>
                <th>Regi_number</th>
                <th>Year</th>
                <th>Work</th>
            </tr>
            {
                data.map((x,index)=>
                (
                    x.Login!==date.toDateString()?
                   <>
                    <tr>
                        <td>{index+1}</td>
                        <td>{x.Gmail}</td>
                        <td>{x.Reg_No}</td>
                        <td>{x.Year}</td>
                        <td><b>{x.Date}</b><br/>{x.Work}</td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                        <hr color="blue"/>
                        </td>
                    </tr>
                   </>:<b></b>
                ))
            }
           </Table>
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
           const responce=await axios.get("https://attendance-339a.onrender.com/student/"+name)
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
       {/* <div className="dailywork">
       <tr>
            <td>
                <label for='smn'><b>Student gmail</b></label>
            </td>
            <td>
                <input type="text" id="smn" placeholder="Enter your gmail" onChange={(e)=>sname(e.target.value)}></input>
            </td>
        </tr>
        <tr>
            <td>
                <label><b>Date</b></label>
            </td>
            <td >
                {date.toDateString()}
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
       </div> */}
        <div className="container-1 container">
        <h2>Daily Work Submission</h2>
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
          <div className="button">
            <button  className="btn btn-success"  onClick={WorkSubmit}>Submit Work</button>
          </div>
      </div>
        </>
    )
}
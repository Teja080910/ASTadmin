import axios from "axios";
import React, { useEffect, useState } from "react";
import "../cerdentials/signup.css";
import { Navbars } from "../nav&foot/nav";
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
    const Updatedata=()=>
    {
        sset(3)
    }
    return(
       <>
        <Navbars/>
        <div className="form-group" style={{display:"flex",justifyContent:"space-around",marginTop:"30px"}}>
        <button  onClick={Dailyatten}>Daily Attendance</button>
        <button onClick={Updatedata}>Update Data</button>
        <button  onClick={Dailyworks}>Daily Work Submission</button>
        </div>
        {
            set===1&&<Dailattend/>
        }
        {
            set===2&&<DailyWork/>
        }
        {
            set===3&&<UpdateData/>
        }

       </>
        
    )
}
export const UpdateData=()=>
{
    const [data,sdata]=useState([]);
    const [name,sname]=useState();
    const [year,syear]=useState()
    const [load,sload]=useState(false);
    const Update=async()=>
    {
        sload(true)
        axios.post("https://attendance-server.vercel.app/updatestudent/" + name+"/"+year)
        .then((res)=>
        {
            if(res.data)
            {
                sload(false)
                window.location.reload(2)
            }
            else
            {
                sload(false)
            }
        })
        .catch((e)=>console.log(e))
    }
    useEffect(()=>
    {
        name&&
        axios.post("https://attendance-server.vercel.app/student/" + name)
        .then((res)=>
        {
            sdata(res.data)
        })
        .catch((e)=>console.log(e))
    },[name])
    return(
        <>
        <div className="register-container container">
        <div className="register-header">Update Your Data</div>
          <div className="form-group">
            <label>Student Email:</label>
            <input  className="form-control" type="text" id="smn" placeholder="Enter your gmail" onChange={(e)=>sname(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>Name: {data?.Name}</label>
          </div>
          <div className="form-group">
            <label>Register Number: {data?.Reg_No}</label>
          </div>
          <div className="form-group">
            <label>Year: {data?.Year}</label>
          </div>
          <div className="form-group">
          <div style={{display:"flex",justifyContent:"space-evenly"}} >
          <label htmlFor="year">Select Year:</label>
            <input
              type="radio"
              id="1st"
              name="year"
              value="1"
              checked={year === '1'}
              onChange={() => syear('1')}
            />
            <label htmlFor="1st">1st</label>
            <input
              type="radio"
              id="2nd"
              name="year"
              value="2"
              checked={year === '2'}
              onChange={() => syear('2')}
            />
            <label htmlFor="2nd">2nd</label>
            <input
              type="radio"
              id="3rd"
              name="year"
              value="3"
              checked={year === '3'}
              onChange={() => syear('3')}
            />
            <label htmlFor="3rd">3rd</label>
            <input
              type="radio"
              id="4th"
              name="year"
              value="4"
              checked={year === '4'}
              onChange={() => syear('4')}
            />
            <label htmlFor="4th">4th</label>
          </div>
        </div>
          <div className="form-group" style={{display:"flex",justifyContent:"center"}}>
            <button  className="btn btn-success"  onClick={Update}>{load?"Updatting...":"Update"}</button>
          </div>
      </div>
        </>
    )
}
export const Dailattend=()=>
{
    const date=new Date();
    const [data,sdata]=useState([]);
    const [tat,stat]=useState([]);
    const date1=date.toDateString()
    const Scrm=async()=>
    {
        window.print();
    }
    useEffect(()=>
    {
        axios.post("https://attendance-server.vercel.app/students")
        .then((result)=>
        {
            sdata(result.data.sort((a, b) => a.Year- b.Year));
        })
        axios.post("https://attendance-server.vercel.app/totaldays")
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
                <th>Regd_number</th>
                <th>Year</th>
                <th >Work</th>
            </tr>
            {
                data.map((x,index)=>
                (
                    x.Login===date.toDateString()&&
                   <>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{x?.Reg_No}</td>
                            <td>{x?.Year}</td>
                            {
                                x.Works &&
                                <td >
                                    {x.Works[date1]?.map((val) =>
                                    (
                                        <p>{val}</p>
                                    ))}
                                </td>
                            }
                        </tr>
                   </>
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
    const [load,sload]=useState(false)
    const date=new Date();
    const WorkSubmit=async()=>
    {
        sload(true)
        try
        {
           const responce=await axios.post("https://attendance-server.vercel.app/student/"+name)
           {
            if(responce.data)
            {
                const res=await axios.post("https://attendance-server.vercel.app/worksubmit/",{name,date:date.toDateString(),work})
                {
                    if(res)
                    {
                        alert("Sucessfully Submited");
                        sload(false)
                        window.location.reload(2);
                    }
                    else
                    {
                        alert("Try again");
                        sload(false)
                    }
                }
            }
            else
            {
                alert("Gmail Not Found");
                sload(false)
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
            <button  className="btn btn-success"  onClick={WorkSubmit}>{load?"Submitting...":"Submit Work"}</button>
          </div>
      </div>
        </>
    )
}
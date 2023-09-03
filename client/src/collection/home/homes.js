import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navbars } from "../nav&foot/nav";
export const Home=()=>
{
    const [dat,sdat]=useState([]);
    localStorage.name='';
    useEffect(()=>
    {
        axios.get("https://attendance-339a.onrender.com/students")
        .then((result)=>
        {
            sdat((result.data.sort((a, b) => b.Num- a.Num)));
        })
    },[])
    
    return(
        <>
        <Navbars/>
        {/* <a href="mailto:`{email}`?subject={subject}&body={body}">Click to Send an Email</a> */}
        <div className="homename">Developing Sadhana App</div>
        <h3 align='center'>Top Five Members In Streaks</h3>
       <table className="studetail">
       {
            dat.slice(0,5).map((x,index)=>(
                <tr>
                     <td style={{height:'7vh'}}>{index + 1}</td>
                             <td>{x.Reg_No}</td>
                             <td><b>{x.Name}</b></td>
                             <td>{x.Branch}</td>
                             <td>{x.Year}</td>
                             <td>
                                 <p><b>{x.Num}</b></p>
                                 <img src={"streak.png"} alt="streak" width={"55px"}></img>
                             </td>
                </tr>
            ))
        }
       </table>
        </>
    )
}
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../home/home.css";
import { Navbars } from "../nav&foot/nav";
export const Home=()=>
{
    const [dat,sdat]=useState([]);
    sessionStorage.name='';
    useEffect(()=>
    {
        axios.post("https://attendance-339a.onrender.com/students")
        .then((result)=>
        {
            sdat((result.data.sort((a, b) => b.Num- a.Num)));
        })
        .catch((e)=>console.log(e))
    },[])
    
    return(
        <>
        <Navbars/>
        <div className="home-container">
        <div className="homename">Developing Sadhana App</div>
        <div className="top-5" >Top Five Members In Streaks</div>
       <table className="studetail">
       {
            dat.slice(0,5).map((x,index)=>(
                <tr>
                     <td >{index + 1}</td>
                           <td>{x.Reg_No}</td>
                             <td><b>{x.Name}</b></td>
                             <td>{x.Branch}</td>
                             <td>{x.Year}</td>
                             <td>
                                <div style={{position: "relative"}}>
                                 <img src={"streak.png"} alt="streak"></img>
                                 <div class="streak-text"><b >{(parseInt(x.MrngStreak)+parseInt(x.Num))/2}</b></div>
                                 </div>
                             </td>
                </tr>
            ))
        }
       </table>
       </div>
        </>
    )
}
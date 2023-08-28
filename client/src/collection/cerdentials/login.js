import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
const Login=()=>{
    const [dat,sdat]=useState([]);
    const [atnd,satnd]=useState([]);
    const [savestu,ssavestu]=useState([]);
    const [select,sselect]=useState([]);
    const [year,syear]=useState([]);
    const [login,slogin]=useState([]);
    const date=new Date();
    const Attend=async()=>
    {
        try
        {
            const responce=await axios.get("https://attendance-339a.onrender.com/student/"+atnd.Gmail)
            {
            if(responce.data)
            {
                atnd.Num=(parseInt(responce.data.Num)+0);
            const responce1=await axios.post("https://attendance-339a.onrender.com/savestudent/"+atnd.Gmail+"/"+atnd.Reg_No) && await axios.post("https://attendance-339a.onrender.com/loginstudent/"+atnd.Gmail+"/"+atnd.Num+"/"+date.toDateString())
            {
                if(responce1)
                {
                    alert(atnd.Reg_No+" Attend");
                    window.location.reload(1);
                }
            }
        }
        else
        {
            alert("Student not found")
        }
    }
        }
        catch(e)
        {
            console.log(e);
        }
    }
    const Complete=()=>
    {
        localStorage.name='';
    }
    const Year=()=>
    {
        localStorage.year=year;
        window.location.reload(1);
    }
    useEffect(()=>
    {
        axios.get("https://attendance-339a.onrender.com/students")
        .then((result)=>
        {
            sdat((result.data.sort((a, b) => a.Year- b.Year)));
        })
    },[])
    return(
        <>
        <Navbars/>
        <div className="clgname">SRKREC Tech Center</div>
        <br/>
        <div>
        <button style={{marginLeft:'5vh'}} onClick={Year} onClickCapture={(e)=>{syear(1)}}><b>1st Year</b></button>
        <button style={{marginLeft:'35vh',backgroundColor:'red'}} onClick={Year} onClickCapture={(e)=>{syear(2)}}><b>2nd Year</b></button>
        <button style={{marginLeft:'35vh',backgroundColor:'blueviolet'}} onClick={Year} onClickCapture={(e)=>{syear(3)}}><b>3rd Year</b></button>
        <button style={{marginLeft:'35vh',backgroundColor:'green'}} onClick={Year} onClickCapture={(e)=>{syear(4)}}><b>4th Year</b></button>
        </div>
        <br/>
        <div>
        <input id='search' value={select}   type="text" autoComplete="none" className="studentcheck"  placeholder="Enter User mail or name" onChange={(e)=>sselect(e.target.value)}></input>
            <table className="studetail">
            <tr>
                <td style={{height:'6vh'}} colSpan={5}><Link to='/register' className="signup">Register</Link></td>
            </tr>
                    <tr>
                        <th>SNO</th>
                        <th>REGISTER NUMBER</th>
                        <th>NAME</th>
                        <th>CLICK</th>
                        <th>STREAK</th>
                    </tr>
                    <tr>
                        <td colSpan={5} style={{ background: 'red' }}></td>
                    </tr>
            {
            dat.filter(user=>(user.Reg_No).toLowerCase().includes(select)||(user.Reg_No).toUpperCase().includes(select)||(user.Name).toUpperCase().includes(select)||(user.Name).toLowerCase().includes(select)).map((x,index) => (
                           <>
                            <tr>
                           {
                             x.Year===localStorage.year?
                             <>
                             <td style={{height:'7vh'}}>{index + 1}</td>
                             <td>{x.Reg_No}</td>
                             <td>{x.Name}</td>
                             <td>
                                {
                                    x.Login!==date.toDateString()?
                                    <button id={x.Gmail} onClick={Attend} onClickCapture={(e)=>{satnd(x)}} style={{border:'none',backgroundColor:'blue',color:'white',borderRadius:'3px',height:'6vh',width:'15vh',cursor:'pointer'}}><b>Attend</b></button>:<b></b>
                                }
                             </td>
                             <td>
                                 <p style={{position:'absolute',margin:'12px 0px 1px 1.3%',fontSize:'15px'}}><b>{x.Num}</b></p>
                                 <img src={"streak.png"} alt="streak" width={"55px"}></img>
                             </td>
                             </>:<b></b>
                           }
                            </tr>
                           </>
                     ))}
            </table>
            <div>

            <Link onClick={Complete} to='/' style={{border:'none',textDecoration:'none',padding:'1%',backgroundColor:'green',marginLeft:'80%',color:'white',borderRadius:'3px',height:'6vh',width:'15vh'}}><b>Complete Day</b></Link>
            </div>
        </div>
        </>
    )

}
export default Login;
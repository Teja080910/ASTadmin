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
            const res=await axios.get("https://attendance-339a.onrender.com/studentcheck/"+atnd.Gmail)
            {
                if(res.data)
                {
                   alert("Already Attend");
                }
                else
                {
                    const responce=await axios.get("https://attendance-339a.onrender.com/student/"+atnd.Gmail)
                    {
                        if(responce.data)
                    {
                        atnd.Num=(parseInt(responce.data.Num)+1);
                        const responce1=await axios.post("https://attendance-339a.onrender.com/streak/"+atnd.Gmail+"/"+atnd.Name+"/"+atnd.Reg_No+"/"+atnd.Year+"/"+atnd.Branch+"/"+atnd.Num)&&await axios.post("https://attendance-339a.onrender.com/savestudent/"+atnd.Gmail+"/"+atnd.Reg_No) && await axios.post("https://attendance-339a.onrender.com/loginstudent/"+atnd.Gmail+"/"+atnd.Reg_No+"/"+date.toLocaleDateString())
                        if(responce1.data)
                        {
                            alert(atnd.Reg_No+" Attend");
                            window.location.reload(1);
                        }
                    }
                    }
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
        axios.get("https://attendance-339a.onrender.com/showsavestu")
        .then((result)=>
        {
            ssavestu(result.data);
        })
        axios.get("https://attendance-339a.onrender.com/students")
        .then((result)=>
        {
            sdat((result.data));
        })
    },[])
    return(
        <>
        <Navbars/>
        <div className="clgname">SRKREC Tech Center</div>
        <br/>
        <tr>
            <td>
                <button style={{marginLeft:'5vh'}} onClick={Year} onClickCapture={(e)=>{syear(1)}}><b>1st Year</b></button>
            </td>
            <td>
                <button style={{marginLeft:'35vh',backgroundColor:'red'}} onClick={Year} onClickCapture={(e)=>{syear(2)}}><b>2nd Year</b></button>
            </td>
            <td>
                <button style={{marginLeft:'35vh',backgroundColor:'blueviolet'}} onClick={Year} onClickCapture={(e)=>{syear(3)}}><b>3rd Year</b></button>
            </td>
            <td>
                <button style={{marginLeft:'35vh',backgroundColor:'green'}} onClick={Year} onClickCapture={(e)=>{syear(4)}}><b>4th Year</b></button>
            </td>
        </tr>
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
            (dat.filter(itemA => savestu.some(itemB => itemB.Gmail !== itemA.Gmail))).filter(user=>(user.Reg_No).toLowerCase().includes(select)||(user.Reg_No).toUpperCase().includes(select)||(user.Name).toUpperCase().includes(select)||(user.Name).toLowerCase().includes(select)).map((x,index) => (
                           <>
                            <tr>
                           {
                             x.Year===localStorage.year?
                             <>
                             <td style={{paddingLeft:"3%",height:'7vh'}}>{index + 1}</td>
                             <td style={{paddingLeft:"11%"}}>{x.Reg_No}</td>
                             <td style={{paddingLeft:"12%"}}>{x.Name}</td>
                             <td style={{paddingLeft:"3%"}}>
                                 <button id={x.Gmail} onClick={Attend} onClickCapture={(e)=>{satnd(x)}} style={{border:'none',backgroundColor:'blue',color:'white',borderRadius:'3px',height:'6vh',width:'15vh',cursor:'pointer'}}><b>Attend</b></button>
                             </td>
                             <td style={{paddingLeft:"4.5%"}}>
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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Login=()=>{
    const [dat,sdat]=useState([]);
    const [atnd,satnd]=useState([]);
    const [savestu,ssavestu]=useState([]);
    const [select,sselect]=useState([]);
    const Attend=async()=>
    {
        const responce=await axios.get("https://attendance-339a.onrender.com/student/"+atnd.Gmail)
        if(responce.data)
        {
            atnd.Num=(parseInt(responce.data.Num)+1);
            await axios.post("https://attendance-339a.onrender.com/streak/"+atnd.Gmail+"/"+atnd.Name+"/"+atnd.Reg_No+"/"+atnd.Year+"/"+atnd.Branch+"/"+atnd.Num)
            const responce1=await axios.post("https://attendance-339a.onrender.com/savestudent/"+atnd.Gmail+"/"+atnd.Reg_No)
            if(responce1.data)
            {
                alert(atnd.Reg_No+" Attend");
                window.location.reload(1);
            }
        }
    }
    const Complete=()=>
    {
        localStorage.gmail='';
    }
    useEffect(()=>
    {
        axios.get("https://attendance-339a.onrender.com/students")
        .then((result)=>
        {
            sdat((result.data));
        })
        axios.get("https://attendance-339a.onrender.com/showsavestu")
        .then((result)=>
        {
            ssavestu(result.data);
        })
    },[])
    return(
        <>
        <div className="display">
        <h1>MERN</h1>
        <h1 className="center">ATTENDANCE</h1>
        <Link to='/register' className="signup">Register</Link>
        </div>
        <div className="display1">
            <Link to='/addproject' className="display1item">Add Project</Link>
            <Link to='/projects' className="display1item" style={{marginRight:'11%'}}>Projects</Link>
        </div>
        <br/>
        <div>
        <input id='search' value={select}   type="text" autoComplete="none" className="studentcheck"  placeholder="Enter User mail or name" onChange={(e)=>sselect(e.target.value)}></input>
            <table className="studetail">
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
            {dat.filter(user=>(user.Reg_No).toLowerCase().includes(select)||(user.Reg_No).toUpperCase().includes(select)||(user.Name).toUpperCase().includes(select)||(user.Name).toLowerCase().includes(select)).map((x,index) => (
                           <>
                            <tr>
                                <td style={{paddingLeft:"3%",height:'7vh'}}>{index + 1}</td>
                                <td style={{paddingLeft:"11%"}}>{x.Reg_No}</td>
                                <td style={{paddingLeft:"12%"}}>{x.Name}</td>
                                <td style={{paddingLeft:"3%"}}>
                                    <button id={x.Gmail} onClick={Attend} onClickCapture={(e)=>{satnd(x)}} style={{border:'none',backgroundColor:'blue',color:'white',borderRadius:'3px',height:'6vh',width:'15vh'}}><b>Attend</b></button>
                                </td>
                                <td style={{paddingLeft:"4.5%"}}>
                                    <p style={{position:'absolute',margin:'12px 0px 1px 1.3%',fontSize:'15px'}}><b>{x.Num}</b></p>
                                    <img src={"streak.png"} alt="streak" width={"55px"}></img>
                                </td>
                            </tr>
                           </>
                     ))}
            </table>
            <div>
            <Link onClick={Complete} to='/' style={{border:'none',textDecoration:'none',padding:'1%',backgroundColor:'green',marginLeft:'80%',color:'white',borderRadius:'3px',height:'6vh',width:'15vh'}}><b>Complete Day</b></Link>
            </div>
            {
                savestu.map((x)=>
                {
                    dat.map((y)=>
                    {
                        if(x.Gmail===y.Gmail)
                        {
                           try
                           {
                            document.getElementById(y.Gmail).style.display="none";
                           }
                           catch(e)
                           {
                            console.log(e);
                           }
                        }
                    })
                })
            }
        </div>
        </>
    )

}
export default Login;
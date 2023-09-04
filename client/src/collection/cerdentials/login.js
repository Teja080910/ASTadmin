import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
const Login=()=>{
    const [dat,sdat]=useState([]);
    const [atnd,satnd]=useState([]);
    const [select,sselect]=useState([]);
    const [year,syear]=useState([]);
    const [otp,sotp]=useState([]);
    const [x,sx] =useState(1);
    const min=Math.pow(10,3);
    const max=Math.pow(10,4)-1;
    const [code,scode]=useState(0);
    const date=new Date();
    const Attend=async()=>
    {
        try
        {
           if(parseInt(otp)===code)
           {
               const responce = await axios.get("https://attendance-339a.onrender.com/student/" + atnd.Gmail)
               {
                   if (responce.data) {
                       if (x === 1) {
                           atnd.Num = (parseInt(responce.data.Num) + 1);
                           sx(2);
                       }
                       const responce1 = await axios.post("https://attendance-339a.onrender.com/loginstudent/" + atnd.Gmail + "/" + atnd.Num + "/" + date.toDateString())
                       {
                           if (responce1) {
                               alert(atnd.Reg_No + " Attend");
                               window.location.reload(1);
                           }
                       }
                   }
                   else {
                       alert("Student not found")
                   }
               }
           }
           else
           {
            alert("Invalid code");
           }
        }
        catch(e)
        {
            console.log(e);
        }
    }
    const Send=async()=>
    {
        document.getElementById('otps').style.display='block'
        let OTP=Math.floor(Math.random()*(max-min+1))+min;
        scode(OTP);
        let ebody=`
        <p>This <b>code</b> came from ${"AST"}</p>
        <p>
        <b>Name::<b>${atnd.Name}
        <br/>
        <b>Gmail::<b>${atnd.Gmail}
        <br>
        <b>Code::<b>${OTP}
        <p>
        `
        window.Email.send({
            SecureToken :"67d18f85-7e11-4af3-b78a-ae6af55623e4",
            To:atnd.Gmail,
            From :"aolsrkr2002@gmail.com",
            Subject : "Daily Attendace Code",
            Body : ebody
        }).then(
          message =>alert(message)&&
        )
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
    const Register=()=>
    {
        localStorage.yoga='';
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
        <div className="otp" id='otps'>
            <input type="number" placeholder="Enter OTP" onChange={(e)=>{sotp(e.target.value)}}></input>
            <button onClick={Attend}><b>Submit</b></button>
        </div>
        <div className="clgname">SRKREC Tech Center</div>
        <br/>
        <div className="yearbtns">
        <Link className="yearbtnsink" onClick={Year} onClickCapture={(e)=>{syear(1)}}><b>1st Year</b></Link>
        <Link className="yearbtnsink" style={{backgroundColor:'red'}} onClick={Year} onClickCapture={(e)=>{syear(2)}}><b>2nd Year</b></Link>
        <Link className="yearbtnsink" style={{backgroundColor:'blueviolet'}} onClick={Year} onClickCapture={(e)=>{syear(3)}}><b>3rd Year</b></Link>
        <Link className="yearbtnsink" style={{backgroundColor:'green'}} onClick={Year} onClickCapture={(e)=>{syear(4)}}><b>4th Year</b></Link>
        </div>
        <br/>
        <div>
        <input id='search' value={select}   type="text" autoComplete="none" className="studentcheck"  placeholder="Enter User mail or name" onChange={(e)=>sselect(e.target.value)}></input>
            <table className="studetail">
            <tr>
                <td style={{height:'6vh'}} colSpan={5}><Link to='/register' onClick={Register} className="signup">Register</Link></td>
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
                                    <button onClick={Send} onClickCapture={(e)=>{satnd(x)}}><b>Attend</b></button>:<b></b>
                                }
                             </td>
                             <td>
                                 <p><b>{x.Num}</b></p>
                                 <img src={"streak.png"} alt="streak" width={"55px"}></img>
                             </td>
                             </>:<b></b>
                           }
                            </tr>
                           </>
                     ))}
            </table>
            <div>

            <Link onClick={Complete} to='/' className="complteday"><b>Complete Day</b></Link>
            </div>
        </div>
        </>
    )

}
export default Login;

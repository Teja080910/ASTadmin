import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
const Login=()=>{
    const [dat,sdat]=useState([]);
    const [atnd,satnd]=useState([]);
    const [select,sselect]=useState([]);
    const [year,syear]=useState([]);
    const [otp,sotp]=useState([]);
    const [tat,stat]=useState([]);
    const [x,sx] =useState(1);
    const min=Math.pow(10,3);
    const max=Math.pow(10,4)-1;
    const [code,scode]=useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const date=new Date();
    const Attend=async()=>
    {
        try
        {
           if(parseInt(otp)===code)
           {
               const responce = await axios.post("https://attendance-server.vercel.app/student/" + atnd.Gmail)
               {
                   if (responce.data) {
                       if (x === 1) {
                           atnd.Num = (parseInt(responce.data.Num) + 1);
                           sx(2);
                       }
                       const responce1 = await axios.post("https://attendance-server.vercel.app/loginstudent/" + atnd.Gmail + "/" + atnd.Num + "/" + date.toDateString())
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
            SecureToken :"3c068e1e-2b17-48d8-b96f-2fa30f12bb6f",
            To:(atnd.Gmail),
            From :"aolsrkr2002@gmail.com",
            Subject : "Daily Attendace Code",
            Body : ebody
        }).then(
          message =>message==="OK"?document.getElementById('otps').style.display='block':alert(message)
        )
    }
    const Complete=()=>
    {
        sessionStorage.removeItem('name');
    }
    const Year=()=>
    {
        sessionStorage.year=year;
        window.location.reload(1);
    }
    const DeleteStudent=()=>
    {
        document.getElementById('password').style.display="block";
    }
    const Delete=()=>
        {
        axios.post("https://attendance-server.vercel.app/admincheck/"+sessionStorage.name+"/"+otp)
        .then((res)=>
        {
            if(res.data)
            {
                axios.post("http://localhost:8000/deletestudent/"+atnd)
                .then((res)=>
                {
                    if(res)
                    {
                        window.location.reload(3);
                    }
                })
                .catch((e)=>console.log(e))
            }
            else
            {
                alert("Enter correct password");
                document.getElementById('password').style.display="none";
            }
        })
        .catch((e)=>console.log(e))
        }
    const Register=()=>
    {
        sessionStorage.removeItem('yoga');
    }
    useEffect(()=>
    {
        axios.post("https://attendance-server.vercel.app/students")
        .then((result)=>
        {
            sdat((result.data.sort((a, b) => a.Year- b.Year)));
            console.log(dat)
        })
        axios.post("https://attendance-server.vercel.app/totaldays")
        .then((result)=>
        {
            stat(result.data)
        })
        setTimeout(() => {
            setIsLoading(false);
          }, 2000);
    },[])
    return(
        <>
        <Navbars/>
        <div className="otp" id='otps'>
            <input type="number" align="center" placeholder="Enter OTP" onChange={(e)=>{sotp(e.target.value)}}></input>
            <button onClick={Attend}><b>Submit</b></button>
        </div>
        <div className="otp" id='password'>
            <input type="password" align="center" placeholder="Enter Password" onChange={(e)=>{sotp(e.target.value)}}></input>
            <button onClick={Delete}><b>Submit</b></button>
        </div>
        <div className="clgname">SRKREC Tech Center</div>
        <div className="yearbtns">
        <Button className="yearbtnsink" onClick={Year} onClickCapture={(e)=>{syear(1)}}><b>1st Year</b></Button>
        <Button className="yearbtnsink" style={{backgroundColor:'red'}} onClick={Year} onClickCapture={(e)=>{syear(2)}}><b>2nd Year</b></Button>
        <Button className="yearbtnsink" style={{backgroundColor:'blueviolet'}} onClick={Year} onClickCapture={(e)=>{syear(3)}}><b>3rd Year</b></Button>
        <Button className="yearbtnsink" style={{backgroundColor:'green'}} onClick={Year} onClickCapture={(e)=>{syear(4)}}><b>4th Year</b></Button>
        </div>
        <br/>
        <div>
        <input id='search' value={select}   type="text" autoComplete="none" className="studentcheck"  placeholder="Enter User mail or name" onChange={(e)=>sselect(e.target.value)}></input>
                    <table className="studetail">
                        {
                            isLoading ?
                                <tr>
                                    <td style={{ backgroundColor: 'white', textAlign: 'center' }} colSpan={5}>
                                        <h5>Loading....</h5>
                                    </td>
                                </tr> :
                                <>
                                    <thead>
                                        <tr>
                                            <td style={{ height: '6vh' }} colSpan={6}><Link to='/register' onClick={Register} className="signup">Register</Link></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5} ><b>Total days::</b>{tat.Days}</td>
                                        </tr>
                                        <tr>
                                            <th>SNO</th>
                                            <th>REGISTER NUMBER</th>
                                            <th>NAME</th>
                                            <th>CLICK</th>
                                            <th>STREAK</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        dat.filter(user => (user.Reg_No).toLowerCase().includes(select) || (user.Reg_No).toUpperCase().includes(select) || (user.Name).toUpperCase().includes(select) || (user.Name).toLowerCase().includes(select)).map((x, index) => (
                                            <>
                                                <>
                                                    <tr>
                                                        {
                                                            x.Year === sessionStorage.year ?
                                                                <>
                                                                    <td style={{ height: '7vh' }}>{index + 1}</td>
                                                                    <td>{x.Reg_No}</td>
                                                                    <td>{x.Name}</td>
                                                                    <td>
                                                                        {
                                                                            x.Login !== date.toDateString() ?
                                                                                <button style={{backgroundColor:"#3498db",borderRadius:"8px",border:"none",color:"white",padding:"5px"}} onClick={Send} onClickCapture={(e) => { satnd(x) }}><b>Attend</b></button> : <b></b>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        
                                                                        <div style={{position: "relative"}}>
                                                                             <img src={"streak.png"} alt="streak"></img>
                                                                            <div class="streak-text"><b >{(parseInt(x.Num))}</b></div>
                                                                            </div>
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={DeleteStudent} onClickCapture={(e) => { satnd(x.Gmail) }} style={{backgroundColor:"red",color:'white',border:'none',borderRadius:"5px"}}>X</button>
                                                                    </td>
                                                                    
                                                                </> : <></>
                                                        }
                                                    </tr>
                                                </>
                                            </>
                                        ))}
                                </>
                        }
                    </table>
            <div>

            <Button onClick={Complete} to='/' className="complteday"><b>Complete Day</b></Button>
            </div>
        </div>
        </>
    )

}
export default Login;

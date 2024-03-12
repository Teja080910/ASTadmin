import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
export const Yoga=()=>
{
    const [dat,sdat]=useState([]);
    const [atnd,satnd]=useState([]);
    const [select,sselect]=useState([]);
    const [year,syear]=useState([]);
    const [otp,sotp]=useState([]);
    const [x,sx] =useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const date=new Date();
    const Attend=async()=>
    {
        try
        {
               const responce = await axios.post(process.env.REACT_APP_database+"/student/" + atnd.Gmail)
               {
                   if (responce.data) {
                       if (x === 1) {
                           atnd.Num = (parseInt(responce.data.MrngStreak) + 1);
                           sx(2);
                       }
                       const responce1 = await axios.post(process.env.REACT_APP_database+"/sadhanaloginstudent/" + atnd.Gmail + "/" + atnd.Num + "/" + date.toDateString())
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
        catch(e)
        {
            console.log(e);
        }
    }
    const Register=async()=>
    {
        const res=await axios.post(process.env.REACT_APP_database+"/sadhanasignup/"+otp)
        {
            if(res)
            {
                alert("Register Successfully")
                window.location='/yoga';
            }
            else
            {
                alert("Mail Not Found");
            }
        }
    }
    const Display=async()=>
    {
       document.getElementById("display").style.display="block";
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
    useEffect(()=>
    {
        axios.post(process.env.REACT_APP_database+"/students")
        .then((result)=>
        {
            sdat((result.data.sort((a, b) => a.Year- b.Year)));
        })
        setTimeout(() => {
            setIsLoading(false);
          }, 2000);
    },[])
    return(
        <>
        <Navbars/>
        <div className="otp" id='display'>
            <input type="gmail" placeholder="Enter Gmail" onChange={(e)=>{sotp(e.target.value)}}></input>
            <button onClick={Register}><b>Submit</b></button>
        </div>
        <div className="clgname">SRKREC Daily Yoga</div>
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
            {
                isLoading?
                <tr>
                    <td style={{backgroundColor:'white',textAlign:'center'}} colSpan={5}>
                        <h5>Loading....</h5>
                    </td>
                </tr>:
                <>
                <tr>
                    
                <td  colSpan={5}><Link onClick={Display} className="signup">Register</Link></td>
                
            </tr>
                    <tr>
                        <th>SNO</th>
                        <th>REGISTER NUMBER</th>
                        <th>NAME</th>
                        <th>CLICK</th>
                        <th>STREAK</th>
                    </tr>
                    {/* <tr>
                        <td colSpan={5} style={{ background: 'red' }}></td>
                    </tr> */}
            {
            dat.filter(user=>(user.Reg_No).toLowerCase().includes(select)||(user.Reg_No).toUpperCase().includes(select)||(user.Name).toUpperCase().includes(select)||(user.Name).toLowerCase().includes(select)).map((x,index) => (
                           <>
                            <tr>
                           {
                             x.Year===sessionStorage.year && x.SadhanaReg===true?
                             <>
                             <td style={{height:'7vh'}}>{index + 1}</td>
                             <td>{x.Reg_No}</td>
                             <td><b>{x.Name}</b></td>
                             <td>
                                {
                                    x.MrngLogin!==date.toDateString()?
                                    <div>
                                    <button style={{backgroundColor:"#3498db",borderRadius:"8px",border:"none",color:"white",padding:"5px"}} onClick={Attend} onClickCapture={(e)=>{satnd(x)}}><b>Attend</b></button></div>:<b></b>
                                }
                             </td>
                             <td>
                                 <div style={{position: "relative"}}>
                                 <img src={"streak.png"} alt="streak"></img>
                                 <div class="streak-text"><b >{(parseInt(x.MrngStreak)+parseInt(x.Num))/2}</b></div>
                                 </div>
                             </td>
                             </>:<b></b>
                           }
                            </tr>
                           </>
                     ))}
                </>
            }
            </table>
            <div className="form-group" style={{marginTop:"20px",marginBottom:"20px"}}>

            <Link onClick={Complete} to='/' className="complteday"><b>Complete Day</b></Link>
            </div>
        </div>
        </>
    )
}

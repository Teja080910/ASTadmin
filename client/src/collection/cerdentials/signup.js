import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
const Signup=()=>{
    const nav=useNavigate();
    const[check,SetCheck]=useState("");
    const[name,SetName]=useState("");
    const[regd,SetRegd]=useState("");
    const[year,SetYear]=useState("");
    const[branch,Setbranch]=useState("");
    const[email,SetEmail]=useState("");
    const [num,snum]=useState(0);
    const Handleclick =async()=>{
        const emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        try{
       if(emailRegex.test(email))
        {
            if(localStorage.yoga==="AST@9899")
            {
                const res = await axios.get("https://attendance-339a.onrender.com/sadhanastudent/" + email)
                {
                    if (res.data) {
                        SetCheck("E-mail or Register Number is already exists");
                    }
                    else {
                        await axios.post("https://attendance-339a.onrender.com/sadhanasignup/" + email + "/" + name + "/" + regd + "/" + year + "/" + branch + "/" + num) ? alert("Register Successfully") && nav('/login') : alert("Try again");
                    }
                }
            }
            else
            {
                const res = await axios.get("https://attendance-339a.onrender.com/sadhanastudent/" + email)
                {
                    if (res.data) {
                        SetCheck("E-mail or Register Number is already exists");
                    }
                    else {
                        await axios.post("https://attendance-339a.onrender.com/sadhanasignup/" + email + "/" + name + "/" + regd + "/" + year + "/" + branch + "/" + num) ? alert("Register Successfully") && nav('/login') : alert("Try again");
                    }
                }
            }
        }
        else
        {
             SetCheck("Invalid Email");
        }
    }
    catch(err)
    {
        console.log(err);
    }
    }
    return(
        <>
        <Navbars/>
        <div className="body">
        <br/ >
        <table className="border" align="center">
        <tr>
            <th colspan="10" className="center" style={{paddingLeft:'40%'}}>SIGNUP FORM</th>
        </tr>
        <br/>
        <tr><td className="marq" colspan="4"><marquee>{check}</marquee></td></tr>
        <br/>
        <tr >
        <th><label for='name'>Name</label></th>
        <td colspan="4">
        <input id='name' className="inputwidth" type="text" placeholder="Full Name" name="name" onChange={(e)=>SetName(e.target.value.toLocaleUpperCase())}/></td></tr><br/>
        <tr>
        <th><label for='regd'>Register Number</label></th>
        <td colspan="4">
        <input  className="inputwidth" type="text" id="regd" placeholder="Regd.no" name="regd" onChange={(e)=>SetRegd(e.target.value.toLocaleUpperCase())}/></td></tr><br/>
        <tr >
        <th><label for='3rd'>Year Of Studying</label></th>
        <td><input type="radio" id="1st"  name="year" onChange={(e)=>SetYear('1')}/><label for="1st">1st</label></td>
        <td><input type="radio" id="2nd"  name="year" onChange={(e)=>SetYear('2')}/><label for="2nd">2nd</label></td>
       <td><input type="radio" id="3rd"  name="year" onChange={(e)=>SetYear('3')}/><label for="3rd">3rd</label></td>
        <td><input type="radio" id="4th"  name="year" onChange={(e)=>SetYear('4')}/><label for="4th">4th</label></td>
        </tr><br/>
        <tr>
        <th><label for='branch'>Branch</label></th>
        <td colspan="4"><select name="branch" id="branch" className="inputwidth" onChange={(e)=>Setbranch(e.target.value)}>
            <option>Choose one</option>
            <option value="AIDS">Artificial Intelligence And Data Science</option>
            <option value="AIML">Artificial Intelligence And Machine Learning</option>
            <option value="Civil">Civil</option>
            <option value="CSBS">Computer Science And Business System</option>
            <option value="CSD">Computer Science And Design</option>
            <option value="CSE">Computer Science And Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electrical And Communication</option>
            <option value="EEE">Electrical And Electronics</option>
            <option value="MECH">Mechanical</option>
            </select></td>
        </tr><br/>
        <tr >
        <th><label for='email'>Email</label></th>
        <td colspan="4"><input className="inputwidth" type="email"  id="email" placeholder="G-mail"  name="email" onChange={(e)=>SetEmail(e.target.value)}/></td></tr><br/>    
        <tr>
            <td><Link to='/login' style={{textDecoration:'none',padding:'1.5% 10%',backgroundColor:'greenyellow',marginLeft:'70%',borderRadius:'5px'}}>Login</Link></td>
        <td colspan="5" align="center"><button className="buttonwidth" type="button" onClick={Handleclick}><b>Register</b></button></td></tr>
        <br/>
        </table>
        </div>
        </>
    );
}
export default Signup;
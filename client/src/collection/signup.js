import React from "react";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup=()=>{
    const nav=useNavigate();
    const[check,SetCheck]=useState("");
    const[name,SetName]=useState("");
    const[regd,SetRegd]=useState("");
    const[year,SetYear]=useState("");
    const[branch,Setbranch]=useState("");
    const[email,SetEmail]=useState("");
    const [num,snum]=useState(0);
    const handleclick =async()=>{
        const emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        try{
       if(emailRegex.test(email))
        {
        const  responce1 = await axios.get("http://localhost:8000/mailcheck/"+email);
        if(responce1.data)
        {
            SetCheck("E-mail or Register Number is already exists");
        }
        else
        {
            const  responce2 = await axios.post("http://localhost:8000/signup/"+email+"/"+name+"/"+regd+"/"+year+"/"+branch+"/"+num);
           if(responce2)
           {
            alert("Register Successfully");
            nav('/login');
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
        <div className="body">
        <br/ >
        <table className="border" align="center">
        <tr>
            <th colspan="10" className="center">SIGNUP FORM</th>
        </tr>
        <br/>
        <tr><td className="marq" colspan="4"><marquee>{check}</marquee></td></tr>
        <br/>
        <tr >
        <th>Name</th>
        <td colspan="4">
        <input className="inputwidth" type="text" id="name" placeholder="Full Name" name="name" onChange={(e)=>SetName(e.target.value.toLocaleUpperCase())}/></td></tr><br/>
        <tr>
        <th>Register Number</th>
        <td colspan="4">
        <input className="inputwidth" type="text" id="regd" placeholder="Regd.no" name="regd" onChange={(e)=>SetRegd(e.target.value.toLocaleUpperCase())}/></td></tr><br/>
        <tr >
        <th>Year Of Studying</th>
        <td><input type="radio" id="1st"  name="year" onChange={(e)=>SetYear('1')}/><label for="1st">1st</label></td>
        <td><input type="radio" id="2nd"  name="year" onChange={(e)=>SetYear('2')}/><label for="2nd">2nd</label></td>
       <td><input type="radio" id="3rd"  name="year" onChange={(e)=>SetYear('3')}/><label for="3rd">3rd</label></td>
        <td><input type="radio" id="4th"  name="year" onChange={(e)=>SetYear('4')}/><label for="4th">4th</label></td>
        </tr><br/>
        <tr>
        <th>Branch</th>
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
        <th>Email</th>
        <td colspan="4"><input className="inputwidth" type="email"  id="email" placeholder="G-mail"  name="email" onChange={(e)=>SetEmail(e.target.value)}/></td></tr><br/>    
        <tr>
        <td colspan="5" align="center"><button className="buttonwidth" type="button" onClick={handleclick}><b>Register</b></button></td></tr>
        <br/>
        </table>
        </div>
    );
}
export default Signup;
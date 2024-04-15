import { useToast } from "@chakra-ui/react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import CryptoAES from 'crypto-js/aes';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../admin/admin.css';
import { Navbars } from '../nav&foot/nav';
export const Admin = () => {
  const [gmail, setgmail] = useState([]);
  const [password, setpassword] = useState([]);
  const date = new Date();
  const toast=useToast()
  const Submit = async () => {
    try {
      const responce = await axios.post(process.env.REACT_APP_database + "/admincheck/" + gmail )
      {
        if (responce.data?.Password===password) {
          if (responce.data.Dates !== date.toDateString()) {
            const res1 = await axios.post(process.env.REACT_APP_database + "/totaldays")
            {
              if (res1.data) {
                if (res1.data.Date !== date.toDateString()) {
                  let tdays = parseInt(res1.data.Days) + 1;
                  const res = await axios.post(process.env.REACT_APP_database + "/updateadmin/" + gmail + "/" + date.toDateString() + "/" + tdays)
                  {
                    if (res) {
                      sessionStorage.gmail = gmail;
                      sessionStorage.password = CryptoAES.encrypt(password, gmail).toString();
                      toast({title:"Login Success",description:"Admin sucessfully logged in Today",status:"success",position:"top", isClosable:true})
                      setTimeout(()=>window.location.href="/attendance",1000)
                    }
                    else {
                      toast({title:"Try again",description:"Please login again",status:"error",position:"bottom-left", isClosable:true})
                    }
                  }
                }
                else {
                  sessionStorage.gmail = gmail;
                  sessionStorage.password = CryptoAES.encrypt(password, gmail).toString();
                  toast({title:"Login Success",description:"Admin 2 sucessfully logged in Today",status:"success",position:"top", isClosable:true})
                  setTimeout(()=>window.location.href="/attendance",1000)
                }
              }
            }
          }
          else {
            sessionStorage.gmail = gmail;
            sessionStorage.password = CryptoAES.encrypt(password, gmail).toString();
            sessionStorage.removeItem('yoga');
            toast({title:"Login Success",description:"Admin sucessfully logged in again",status:"success",position:"top", isClosable:true})
            setTimeout(()=>window.location.href="/attendance",1000)
          }
        }
        else {
          toast({title:"Please register as admin",description:"Credentials unmatched",status:"error",position:"bottom-left", isClosable:true})
        }
      }
    }
    catch (e) {
      toast({title:"Network Error",description:e?.name,status:"warning",position:"bottom-left", isClosable:true})
    }
  }
  return (
    <>
      <Navbars />
      <div className="login-container">
        <h1 className="heading">Attendance </h1>
        <div className="form">
          <div className="form-group">
            <label htmlFor="admin">Admin Gmail:</label>
            <input
              className="form-control"
              type="text"
              name="admin"
              id="admin"
              placeholder="Enter Admin Gmail"
              value={gmail}
              onChange={(e) => setgmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn btn-primary admin-button" onClick={Submit}>
              Submit
            </button>
          </div>
        </div>
      </div>


    </>
  )
}



export const Adminreg = () => {
  const nav = useNavigate();
  const [gmail, setgmail] = useState([]);
  const [password, setpassword] = useState([]);
  const Submit = async () => {
    const res = await axios.post(process.env.REACT_APP_database + "/admincheck/" + gmail + "/" + password)
    {
      if (res.data) {
        alert("Already Register")
      }
      else {
        if (await axios.post(process.env.REACT_APP_database + "/adminregi/" + gmail + "/" + password)) {
          alert("Sucessfully Registered");
          nav('/adminlogin')
        }
      }
    }
  }
  return (
    <>

      <div className="login-container">
        <h1 className="heading">Admin Register</h1>
        <div className="form">
          <div className="form-group">
            <label htmlFor="admin">Admin Gmail:</label>
            <input
              className="form-control"
              type="text"
              name="admin"
              id="admin"
              placeholder="Enter Admin Gmail"
              value={gmail}
              onChange={(e) => setgmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className=" admin-button" onClick={Submit}>
              Add Admin
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
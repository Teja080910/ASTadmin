import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cerdentials/signup.css";
import { Navbars } from "../nav&foot/nav";
const Signup = () => {
  const nav = useNavigate();
  const [check, SetCheck] = useState("");
  const [name, SetName] = useState("");
  const [regd, SetRegd] = useState("");
  const [year, SetYear] = useState("");
  const [branch, Setbranch] = useState("");
  const [email, SetEmail] = useState("");
  const [num, snum] = useState(0);
  const toast = useToast();
  const Handleclick = async () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      if (emailRegex.test(email)) {
        const res = await axios.post(process.env.REACT_APP_database + "/student/" + email)
        {
          if (res.data) {
            SetCheck("E-mail or Register Number is already exists");
          }
          else {
            const res = await axios.post(process.env.REACT_APP_database + "/signup/" + email + "/" + name + "/" + regd + "/" + year + "/" + branch + "/" + num)
            {
              if (res) {
                toast({ title: "Register Successfully", status: 'success', position: "bottom-right", isClosable: true })
                setTimeout(() => {
                  window.location = '/login'
                  window.history.back();
                }, 1000);
              }
              else {
                toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true })
              }
            }
          }
        }

      }
      else {
        SetCheck("Invalid Email");
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const Login = () => {
    if (sessionStorage.yoga === "Yoga@9899") {
      window.location = '/yoga';
    }
    else {
      window.history.back();
      // window.location = '/login';
    }
  }
  return (
    <>
      <Navbars />
      <div className="register-body">
        <div className="register-container">
          <div className="register-header">
            <h2>SIGNUP FORM</h2>
          </div>
          <div className="form-group">
            <h6><b><marquee>{check}</marquee></b></h6>
          </div>
          <div className="register-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                name="name"
                value={name}
                onChange={(e) => SetName(e.target.value.toUpperCase())}
              />
            </div>

            <div className="form-group">
              <label htmlFor="regd">Register Number</label>
              <input
                type="text"
                id="regd"
                placeholder="Regd.no"
                name="regd"
                value={regd}
                onChange={(e) => SetRegd(e.target.value.toUpperCase())}
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year Of Studying</label>
              <div style={{ display: "flex", justifyContent: "space-evenly" }} >
                <input
                  type="radio"
                  id="1st"
                  name="year"
                  value="1"
                  checked={year === '1'}
                  onChange={() => SetYear('1')}
                />
                <label htmlFor="1st">1st</label>
                <input
                  type="radio"
                  id="2nd"
                  name="year"
                  value="2"
                  checked={year === '2'}
                  onChange={() => SetYear('2')}
                />
                <label htmlFor="2nd">2nd</label>
                <input
                  type="radio"
                  id="3rd"
                  name="year"
                  value="3"
                  checked={year === '3'}
                  onChange={() => SetYear('3')}
                />
                <label htmlFor="3rd">3rd</label>
                <input
                  type="radio"
                  id="4th"
                  name="year"
                  value="4"
                  checked={year === '4'}
                  onChange={() => SetYear('4')}
                />
                <label htmlFor="4th">4th</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <select
                name="branch"
                id="branch"
                value={branch}
                onChange={(e) => Setbranch(e.target.value)}
              >
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
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="G-mail"
                name="email"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ display: "flex", justifyContent: "space-evenly" }}>
              <button type="button" onClick={Handleclick}>
                <b>Register</b>
              </button>
              <Link className="login-link" onClick={Login}>
                <b>Attend</b>
              </Link>
            </div>
          </div>


        </div>
      </div>
    </>
  );
}
export default Signup;
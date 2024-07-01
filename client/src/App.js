import axios from 'axios';
import CryptoAES from 'crypto-js/aes.js';
import CryptoENC from "crypto-js/enc-utf8";
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Admin, Adminreg } from '../src/collection/admin/admin.js';
import Login from '../src/collection/cerdentials/login.js';
import Signup from '../src/collection/cerdentials/signup.js';
import { Yoga } from '../src/collection/dailysadhana/dailysadhana.js';
import { Addproject, Projects } from '../src/collection/project/project.js';
import { Pro } from '../src/collection/project/sampleproject.js';
import { Scrum } from '../src/collection/scrummaster/scrum.js';
import './App.css';
import { BootcampSidebar } from './bootcamp/bootcampsidebar/bootcampsidebar.js';
import { Attendance } from './collection/attendance/attendance.js';
import { Timings } from './collection/attendance/timings.js';
import { Face } from './collection/face/face.js';
import { Home } from './collection/home/homes.js';
import { Send } from './collection/project/send.js';
import { Appstore } from './collection/redux/login.js';
import Sample from './collection/sample/sample.js';
import './responce.css';
import { HackathonSidebar } from './hackathon/hackathonsidebar/hackathonsidebar.js';
import { RegisterForm } from './bootcamp/Register/register.js';
import { LoginForm } from './bootcamp/login/login.js';
import Timer from './hackathon/main-timer/Timer.jsx';
import socketIOClient from "socket.io-client";
import FeedbackForm from './hackathon/feedbackform/feedbackform.js';
const SOCKET_SERVER_URL = "https://timer-server-edko.onrender.com";
const socket = socketIOClient(SOCKET_SERVER_URL);



function App() {
  const [set, setSet] = useState()
  const [time, setTime] = useState()
  const salt = CryptoENC
  useEffect(() => {
    axios.post(process.env.REACT_APP_database + "/admincheck/" + sessionStorage.gmail)
      .then((res) => {
        if (res?.data?.Password === CryptoAES.decrypt(sessionStorage.password ? sessionStorage.password : "1234", sessionStorage.gmail ? sessionStorage.gmail : "1234").toString(salt)) {
          setSet(res?.data)
        }
      }).catch((e) => console.log(e))
  }, [sessionStorage.gmail])
  Timings().then((res) => setTime(res))
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/adminlogin" element={<Admin />} />
          <Route path='adminregister' element={<Adminreg />} />
          <Route path="/attendance" element={!set ? <Attendance /> : <Admin />} />
          <Route path='/tech' element={time?.tech ? <Login /> : <Attendance />} />
          <Route path="/register" element={<Signup />} />
          <Route path='/yoga' element={time?.yoga ? <Yoga /> : <Attendance />} />
          <Route path='/addproject' element={<Addproject />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/scrummaster' element={<Scrum />} />
          <Route path='/pro' element={<Pro />} />
          <Route path='/chatwithme' element={<Send />} />
          <Route path='/face' element={<Face />} />
          <Route path='sample' element={<Sample />} />
          <Route path='/redux' element={<Appstore />} />
          <Route path='/bootcamp' element={<BootcampSidebar />} />
          <Route path='/hackathon' element={<HackathonSidebar/>}/>
          <Route path='/bootcampregister' element={<RegisterForm/>}/>
          <Route path='/bootcamplogin' element={<LoginForm/>}/>
          <Route path='/hackathon/feedbackform' element={<FeedbackForm/>}/>
          <Route path='/hackathon' element={<HackathonSidebar socket={socket}/>}/>
          <Route path='/hackathon/timer' element={<Timer socket={socket}/>}/>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;



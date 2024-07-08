import axios from 'axios';
import CryptoAES from 'crypto-js/aes.js';
import CryptoENC from "crypto-js/enc-utf8";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Admin, Adminreg } from '../src/collection/admin/admin.js';
import Login from '../src/collection/cerdentials/login.js';
import Signup from '../src/collection/cerdentials/signup.js';
import { Yoga } from '../src/collection/dailysadhana/dailysadhana.js';
import { Addproject, Projects } from '../src/collection/project/project.js';
import { Pro } from '../src/collection/project/sampleproject.js';
import { Scrum } from '../src/collection/scrummaster/scrum.js';
import './App.css';
import { Actions } from './actions/actions.js';
import { RegisterForm } from './bootcamp/Register/register.js';
import { BootcampSidebar } from './bootcamp/bootcampsidebar/bootcampsidebar.js';
import { LoginForm } from './bootcamp/login/login.js';
import { Attendance } from './collection/attendance/attendance.js';
import { Timings } from './collection/attendance/timings.js';
import { Face } from './collection/face/face.js';
import { Home } from './collection/home/homes.js';
import { Send } from './collection/project/send.js';
import { Appstore } from './collection/redux/login.js';
import Sample from './collection/sample/sample.js';
import { HackathonSidebar } from './hackathon/hackathonsidebar/hackathonsidebar.js';
import Timer from './hackathon/main-timer/Timer.jsx';
import './responce.css';
import { socket } from './socket.js';
import EnhancedNetworkChecker from './NetworkChecker.js';



function App() {

  const [set, setSet] = useState(false)
  const [boot, setBoot] = useState(false)
  const [bootload, setBootload] = useState(false)
  const [load, setLoad] = useState(false)
  const [time, setTime] = useState()
  const mail = useSelector((state) => state.user.bootmail);
  // document.title = "HOME | AST ADMIN"

  const password = useSelector((state) => state.user.bootpassword);
  const salt = CryptoENC
  
  const AdminLogin = async () => {
    await axios.post(process.env.REACT_APP_database + "/admincheck/" + sessionStorage.gmail)
      .then((res) => {
        if (res?.data?.Password === CryptoAES.decrypt(sessionStorage.password ? sessionStorage.password : "1234", sessionStorage.gmail ? sessionStorage.gmail : "1234").toString(salt)) {
          setSet(true)
          setLoad(true)
        }
        setLoad(true)
      }).catch((e) =>{})
  }

  const BootCamp = async () => {
    await Actions.BootAdminLogin(mail, CryptoAES.decrypt(password ? password : "1234", mail ? mail : "1234").toString(salt))
      .then((res) => {
        if (res?.data?.message) {
          setBoot(true)
          setBootload(true)
        }
        setBootload(true)
      }).catch((e) => {})
  }

  const Timing = () => {
    Timings().then((res) => setTime(res)).catch((e) => {})
  }

  useEffect(() => {
    AdminLogin()
    BootCamp()
    Timing()
  }, [set, boot, time])
  return (
    <>
      {
        <>
        <EnhancedNetworkChecker/>
          <BrowserRouter>
            <Routes>
              {
                load && <>
                  <Route path='/' element={<Home />} />
                  <Route path="/adminlogin" element={<Admin />} />
                  <Route path='adminregister' element={<Adminreg />} />
                  <Route path="/register" element={<Signup />} />
                  <Route path='/addproject' element={<Addproject />} />
                  <Route path='/projects' element={<Projects />} />
                  <Route path='/scrummaster' element={<Scrum />} />
                  <Route path='/pro' element={<Pro />} />
                  <Route path='/chatwithme' element={<Send />} />
                  <Route path='/face' element={<Face />} />
                  <Route path='sample' element={<Sample />} />
                  <Route path='/redux' element={<Appstore />} />
                  <Route path='/bootcampregister' element={<RegisterForm />} />
                  <Route path='/bootcamplogin' element={<LoginForm />} />
                  <Route path="/attendance" element={set ? <Attendance /> : <Admin />} />
                  <Route path='/tech' element={set?!time?.tech? <Login /> : <Attendance />:<Admin/>} />
                  <Route path='/yoga' element={set?time?.yoga  ? <Yoga /> : <Attendance />:<Admin/>} />
                </>
              }
              {bootload && <>
                <Route path='/bootcamp' element={boot ? <BootcampSidebar /> : <LoginForm />} />
                <Route path='/hackathon' element={boot ? <HackathonSidebar socket={socket} /> : <LoginForm />} />
                <Route path='/hackathon/timer' element={boot ? <Timer socket={socket} /> : <LoginForm />} />
              </>}
            </Routes>
          </BrowserRouter>
        </>
      }
    </>
  );
}
export default App;
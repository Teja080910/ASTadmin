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
import EnhancedNetworkChecker from './NetworkChecker.js';
import { Actions } from './actions/actions.js';
import { Authentication } from './actions/auths.js';
import ConsoleHome from './ast-console/ast-console-home.js';
import { ConsoleLogin } from './ast-console/sigin.js';
import { RegisterForm } from './bootcamp/Register/register.js';
import { BootcampSidebar } from './bootcamp/bootcampsidebar/bootcampsidebar.js';
import { LoginForm } from './bootcamp/login/login.js';
import { Attendance } from './collection/attendance/attendance.js';
import { FaceRegorg } from './collection/face/face.js';
import { Home } from './collection/home/homes.js';
import { Send } from './collection/project/send.js';
import { Appstore } from './collection/redux/login.js';
import Sample from './collection/sample/sample.js';
import { HackathonSidebar } from './hackathon/hackathonsidebar/hackathonsidebar.js';
import Timer from './hackathon/main-timer/Timer.jsx';
import './responce.css';
import { socket } from './socket.js';
import ConsoleHome from './ast-console/ast-console-home.js';
import AstConsoleLayout from './ast-console/ast-console-layout.js';

function App() {
  const [set, setSet] = useState(false)
  const [boot, setBoot] = useState(false)
  const [bootload, setBootload] = useState(false)
  const [load, setLoad] = useState(false)
  const { bootmail, adminpass, bootpass, adminEmail,consolepass, adminLoginState } = Authentication()

  const AdminLogin = async () => {
    await Actions.AttendanceAdminLogin()
      .then((res) => {
        if (res?.data?.Password === adminpass) {
          setSet(true)
          setLoad(true)
        }
        setLoad(true)
      }).catch((e) => { })
  }

  // Bootcamp login check
  const BootCamp = async () => {
    await Actions.BootAdminLogin(bootmail, bootpass)
      .then((res) => {
        if (res?.data?.message) {
          setBoot(true)
          setBootload(true)
        }
        setBootload(true)
      }).catch((e) => { })
  }

  // Call all checks on component mount
  useEffect(() => {
    AdminLogin()
    BootCamp()
  }, [set, boot])

  return (
    <>
      <EnhancedNetworkChecker />
      <BrowserRouter>
        <Routes>
          {load && (
            <>
              <Route path='/' element={<Home />} />
              <Route path="/adminlogin" element={<Admin />} />
              <Route path='adminregister' element={<Adminreg />} />
              <Route path="/register" element={<Signup />} />
              <Route path='/addproject' element={<Addproject />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/scrummaster' element={<Scrum />} />
              <Route path='/pro' element={<Pro />} />
              <Route path='/chatwithme' element={<Send />} />
              <Route path='/face' element={<FaceRegorg />} />
              <Route path='sample' element={<Sample />} />
              <Route path='/redux' element={<Appstore />} />
              <Route path='/bootcampregister' element={<RegisterForm />} />
              <Route path='/bootcamplogin' element={<LoginForm />} />
              <Route path="/attendance" element={set ? <Attendance /> : <Admin />} />
              <Route path='/tech' element={set ? <Login /> : <Admin />} />
              <Route path='/yoga' element={set ? <Yoga /> : <Admin />} />
              <Route path='/console' element={! adminLoginState ?  <ConsoleLogin/>: <AstConsoleLayout adminEmail={adminEmail} />}/>
              <Route path='/console/:page' element={adminLoginState?<AstConsoleLayout adminEmail={adminEmail} /> : <ConsoleLogin/> }/>
            </>
          )}
          {bootload && (
            <>
              <Route path='/bootcamp' element={boot ? <BootcampSidebar /> : <LoginForm />} />
              <Route path='/hackathon' element={boot ? <HackathonSidebar socket={socket} /> : <LoginForm />} />
              <Route path='/hackathon/timer' element={boot ? <Timer socket={socket} /> : <LoginForm />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

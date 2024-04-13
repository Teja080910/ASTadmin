import axios from 'axios';
import CryptoAES from 'crypto-js/aes.js'
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
import { Face } from './collection/face/face.js';
import { Home } from './collection/home/homes.js';
import { Send } from './collection/project/send.js';
import Sample from './collection/sample/sample.js';
import './responce.css';
function App() {
  const [set, setSet] = useState()
  const salt = CryptoENC
  useEffect(() => {
    axios.post(process.env.REACT_APP_database + "/admincheck/" + sessionStorage.gmail + "/" + CryptoAES.decrypt(sessionStorage.password ? sessionStorage.password : "1234", sessionStorage.gmail ? sessionStorage.gmail : "1234").toString(salt))
      .then((res) => {
        setSet(res.data)
      }).catch((e) => console.log(e))
  }, [sessionStorage.gmail])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/adminlogin" element={<Admin />} />
          <Route path='adminregister' element={<Adminreg />} />
          <Route path="/login" element={set ? <Login /> : <Admin />} />
          <Route path="/register" element={<Signup />} />
          <Route path='/yoga' element={sessionStorage.yoga === "Yoga@9899" ? <Yoga /> : <Home />} />
          <Route path='/addproject' element={<Addproject />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/scrummaster' element={<Scrum />} />
          <Route path='/pro' element={<Pro />} />
          <Route path='/chatwithme' element={<Send />} />
          <Route path='/face' element={<Face />} />
          <Route path='sample' element={<Sample />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;



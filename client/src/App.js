import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Admin, Adminreg } from '../src/collection/admin/admin.js';
import Login from '../src/collection/cerdentials/login.js';
import Signup from '../src/collection/cerdentials/signup.js';
import {Yoga} from '../src/collection/dailysadhana/dailysadhana.js';
import {Addproject, Projects } from '../src/collection/project/project.js';
import { Pro } from '../src/collection/project/sampleproject.js';
import { Scrum } from '../src/collection/scrummaster/scrum.js';
import './App.css';
import { Home } from './collection/home/homes.js';
import './responce.css';
import { Send } from './collection/project/send.js';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/adminlogin" element={<Admin/>}/>
      <Route path='adminregister' element={<Adminreg/>}/>
      <Route path="/login" element={localStorage.name===''?<Admin/>:<Login/>}/>
      <Route path="/register" element={<Signup/>}/>
      <Route path='/yoga' element={localStorage.yoga==="Yoga@9899"?<Yoga/>:<Home/>}/>
      <Route path='/addproject' element={<Addproject/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/scrummaster' element={<Scrum/>}/>
      <Route path='/pro' element={<Pro/>}/>
      <Route path='/send' element={<Send/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;

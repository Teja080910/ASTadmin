import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Admin } from './collection/admin/admin';
import Login from './collection/cerdentials/login';
import Signup from './collection/cerdentials/signup';
import { Home } from './collection/home/home';
import { Adminreg } from './collection/admin/admin';
import { Projects,Addproject } from './collection/project/project';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/adminlogin" element={<Admin/>}/>
      <Route path='adminregister' element={<Adminreg/>}/>
      <Route path="/login" element={localStorage.name===''?<Home/>:<Login/>}/>
      <Route path="/register" element={localStorage.name===''?<Home/>:<Signup/>}/>
      <Route path='/addproject' element={localStorage.name===''?<Home/>:<Addproject/>}/>
      <Route path='/projects' element={localStorage.name===''?<Home/>:<Projects/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;

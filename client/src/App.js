import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './responce.css';
import { Admin, Adminreg } from './collection/admin/admin';
import Login from './collection/cerdentials/login';
import Signup from './collection/cerdentials/signup';
import { Home } from './collection/home/homes';
import { Addproject, Projects } from './collection/project/project';
import { Scrum } from './collection/scrummaster/scrum';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/adminlogin" element={<Admin/>}/>
      <Route path='adminregister' element={<Adminreg/>}/>
      <Route path="/login" element={localStorage.name===''?<Admin/>:<Login/>}/>
      <Route path="/register" element={localStorage.name===''?<Home/>:<Signup/>}/>
      <Route path='/addproject' element={<Addproject/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/scrummaster' element={<Scrum/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;

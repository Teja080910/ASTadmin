import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './collection/admin';
import Signup from './collection/signup';
import Login from './collection/login';
import { Addproject, Projects } from './collection/project';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
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

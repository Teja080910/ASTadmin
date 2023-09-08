import { BrowserRouter, Routes } from 'react-router-dom';
// import './App.css';
// import './responce.css';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Hom/>}/>
      {/* <Route path="/adminlogin" element={<Admin/>}/> */}
      {/* <Route path='adminregister' element={<Adminreg/>}/> */}
      {/* <Route path="/login" element={localStorage.name===''?<Admin/>:<Login/>}/> */}
      {/* <Route path="/register" element={<Signup/>}/> */}
      {/* <Route path='/yoga' element={localStorage.yoga==="Yoga@9899"?<Yoga/>:<Home/>}/> */}
      {/* <Route path='/addproject' element={<Addproject/>}/> */}
      {/* <Route path='/projects' element={<Projects/>}/> */}
      {/* <Route path='/scrummaster' element={<Scrum/>}/> */}
      {/* <Route path='/pro' element={<Pro/>}/> */}
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;

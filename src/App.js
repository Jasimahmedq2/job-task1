import { Route, Routes } from 'react-router';
import './App.css';
import Login from './Authentication/Login';
import Navbar from './Authentication/navbar/Navbar';
import SingUp from './Authentication/SingUp';

function App() {
  return (
    <>
    <Navbar />
     <Routes>
     <Route path='/' element={<SingUp/>}/>
      <Route path='/login' element={<Login />}/>

     </Routes>
    </>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

//pages and components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <>
  
    <Router>
       <div className='container'>
         <Header />
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
  
        </Routes> 
        <Footer/> 
       
    </div>  
    </Router>
    <ToastContainer /> 
   
   
  
   </>
   
  );
}

export default App;

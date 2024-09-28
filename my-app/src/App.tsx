import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './client/login/Login';
import Footer from './client/footer/Footer';
import VerifyEmail from './client/VerifyEmail';
import ForgotPassword from './client/inputEmail/checkEmai';
import VerifyForgotpassword from './client/veriforgotpassword';
import ResetPassword from './client/resetpassword';
import Homepage from './client/homepage';


const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-forgot-password" element={<VerifyForgotpassword />} />
        <Route path="/checkmail" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/home" element={<Homepage />} />
         
      </Routes>
     
    </div>
  );
};

export default App;

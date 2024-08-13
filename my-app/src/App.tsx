// src/App.tsx
import React, { useState } from 'react';

import './App.css';
import Register from './client/register/register';
import Login from './client/login/Login';


const App: React.FC = () => {
  
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggleForm}>
          {showLogin ? 'Chuyển sang Đăng ký' : 'Chuyển sang Đăng nhập'}
        </button>
        {showLogin ? (
          <>
            <h1>Giao diện Đăng nhập</h1>
            <Login />
          
          </>
        ) : (
          <>
            <h1>Giao diện Đăng ký</h1>
            <Register />
          </>
        )}
      </header>
    
    </div>
  );
};

export default App;


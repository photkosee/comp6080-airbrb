import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import { LandingPage } from './components/LandingPage';
import Dashboard from './components/Dashboard';

const PageList = () => {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const checktoken = localStorage.getItem('token');
    if (checktoken) {
      setToken(checktoken);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage token={token} setToken={setToken} />} />
        <Route path="/register" element={<Register token={token} setToken={setToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} />} />
        <Route path="/dashboard" element={<Dashboard token={token} setToken={setToken} />} />
      </Routes>
    </>
  );
}

export default PageList;

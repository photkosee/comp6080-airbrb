import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { LandingPage } from './components/pages/LandingPage';
import Dashboard from './components/pages/Dashboard';
import ListingView from './components/pages/ListingView';
import ManageBooking from './components/pages/ManageBooking';
import ListingEdit from './components/pages/ListingEdit';

const PageList = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checktoken = localStorage.getItem('token');
    if (checktoken) {
      setToken(checktoken);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage token={token} setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} />} />
        <Route path="/dashboard" element={<Dashboard token={token} setToken={setToken} />} />
        <Route path="/edit/:id" element={<ListingEdit token={token} setToken={setToken} />} />
        <Route path="/dashboard/:id" element={<ManageBooking token={token} setToken={setToken} />} />
        <Route path="/listing/:id" element={<ListingView token={token} setToken={setToken} />} />
      </Routes>
    </>
  );
}

export default PageList;

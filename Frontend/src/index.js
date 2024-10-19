import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Interview from './pages/Interview';
import Job from './pages/Job';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/job" element={<Interview/>} />
        <Route path="/job/create" element={<Job/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
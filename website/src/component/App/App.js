import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../../pages/Login/Login';
import Home from '../../pages/Home/Home';

import './App.css';
import Lobby from '../../pages/Lobby/Lobby';
import Game from '../../pages/Game/Game';
import Test from '../../pages/Test/Test';
import Register from '../../pages/Login/Register';
import { Navigate } from 'react-router-dom';
import ApiVerifLogin from '../../api/User/VerifLogin';
import Loader from '../Loader/Loader';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
        <Route path="/test" element={<Test />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
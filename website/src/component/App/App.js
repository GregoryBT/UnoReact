import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../../pages/Login/Login';
import Home from '../../pages/Home/Home';

import './App.css';
import Lobby from '../../pages/Lobby/Lobby';
import Game from '../../pages/Game/Game';
import Test3 from '../../pages/Test/Test3';
import Register from '../../pages/Login/Register';
import { Navigate } from 'react-router-dom';
import ApiVerifLogin from '../../api/User/VerifLogin';
import Loader from '../Loader/Loader';
import MyContext from '../../utils/context/socket.jsx';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

function App() {
  return (
    <MyContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
          <Route path="/test" element={<Test3 />} />
          <Route path="/loader" element={<Loader />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;

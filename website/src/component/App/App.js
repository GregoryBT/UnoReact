import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../../pages/Login/Login';
import Home from '../../pages/Home/Home';

import './App.css';
import Lobby from '../../pages/Lobby/Lobby';
import Game from '../../pages/Game/Game';
import Test from '../../pages/Test/Test';
import Register from '../../pages/Login/Register';
import SecuredRoute from '../SecuredRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <SecuredRoute path="/home" element={<Home />} />
        <SecuredRoute path="/lobby" element={<Lobby />} />
        <SecuredRoute path="/game" element={<Game />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
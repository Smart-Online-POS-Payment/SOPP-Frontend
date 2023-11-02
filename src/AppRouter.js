import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage></LoginPage>}></Route>
            <Route path='/login' element={<LoginPage></LoginPage>}></Route>
            <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter
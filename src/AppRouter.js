import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import PaymentHistoryPage from './components/PaymentHistoryPage/PaymentHistoryPage';
import CreatePaymentPage from './components/CreatePaymentPage/CreatePaymentPage';
import QrCodeView from './components/CreatePaymentPage/QrCodeView';
import HomePage from './components/HomePage/HomePage'
import Notification from './components/NotificationComponents/Notification';
import ProfilePage from './components/ProfilePage/ProfilePage';

function AppRouter() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage></LoginPage>}></Route>
            <Route path='/login' element={<LoginPage></LoginPage>}></Route>
            <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
            <Route path='/home' element = {
              <div>
                <HomePage></HomePage>
                <Notification></Notification>
              </div> 
            }></Route>
            <Route path='/home/profile' element={<ProfilePage></ProfilePage>}></Route>
            <Route path='/home/payment-history' element={<PaymentHistoryPage></PaymentHistoryPage>}></Route>
            <Route path='/home/create-payment' element = {<CreatePaymentPage></CreatePaymentPage>}></Route>
            <Route path='/home/qr/:uuid' element = {<QrCodeView></QrCodeView>}></Route>
            
        </Routes>
    </BrowserRouter>

  );
}

export default AppRouter
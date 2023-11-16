import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css'; // Ensure the CSS file is imported

const HomePage = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const handleCreatePayment = () => {
        navigate('/home/create-payment');
    };

    const handlePaymentHistory = () => {
        navigate('/home/payment-history');
    };

    const handleWithdrawMoney = () => {
        console.log('Withdraw Money Clicked');
    };

    const handleMenuToggle = () => {
      setShowMenu(!showMenu);
      console.log('Menu Toggled', !showMenu); // This will log the new state
    };

    const handleProfile = () => {
        console.log('Profile Clicked'); // Placeholder for profile functionality
    };

    const handleExit = () => {
        console.log('Exit Clicked');
    };

    return (
        <div className="main-screen">
            <h1>Merchant Dashboard</h1>
            <div className="menu">
                <button onClick={handleMenuToggle}>Menu</button>
                {showMenu && (
                    <div className="dropdown-menu">
                        <button onClick={handleProfile}>My Profile</button>
                    </div>
                )}
            </div>
            <div className="exit-button">
                <button onClick={handleExit}>Exit</button>
            </div>
            <button onClick={handleCreatePayment}>Receive Payment</button>
            <button onClick={handlePaymentHistory}>Payment History</button>
            <button onClick={handleWithdrawMoney}>Withdraw Money</button>
        </div>
    );
};

export default HomePage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, deleteCookie, setCookie } from "../../cookie-functions";
import "./HomePage.scss";
import getPaymentImage from "../HomePage/card_images/payment-method.png";
import getProfileImage from "../HomePage/card_images/profile.png";
import logoutImage from "../HomePage/card_images/logout.png";
import dashboardImage from "../HomePage/card_images/dashboard.png"
import axios from 'axios';


const HomePage = () => {

  const parseBoolean = (value) => {
    return value === "true";
  };

  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [showWelcome, setShowWelcome] = useState(parseBoolean(getCookie("show-welcome")));
  const [userName, setUserName] = useState("Test");

  

  useEffect(() => {
    if (!getCookie("sopp-auth")) {
      navigate("/login");
    } else {

      let username = getCookie("user-displayName");
      let accessToken = getCookie("sopp-auth");
      const userId = getCookie('userId');
      let api = "http://34.135.253.130:80/wallet/" + userId;
      console.log("user id:"+userId);

      axios.get(api, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        // handle response
        console.log(response)
        setBalance(response.data.balance);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        console.log('Axios config:', error.config);
      });

      console.log("username: " + username);
      setUserName(username);
      setTimeout(() => {
        setShowWelcome(false);
        setCookie("show-welcome", "false");
      }, 3000);
      // setCookie("greeted", true)
    }
    
  }, []);

  
    

  const handleCreatePayment = () => {
    navigate("/home/create-payment");
  };


  const handleProfile = () => {
    console.log("Profile Clicked"); // Placeholder for profile functionality
    navigate("/home/profile");
  };

  const handleDashboard = () => {
    navigate("/home/dashboard");
  };

  const handleExit = () => {
    deleteCookie("sopp-auth");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      <div id="home-page">
        <div className="container">
          <div className="main-screen">
            {showWelcome && (
              <div className={`welcome-message ${showWelcome ? "" : "hide"}`}>
                Welcome, {userName}
              </div>
            )}
            {!showWelcome && (
              <>
                <div className="main-content">
                  <div className="username-sign">{userName}'s Dashboard</div>                  
                  <div className="balance-sign">Balance: {balance !== null ? `₺${balance}` : 'Loading...'}</div>
                  <div className="exit-button">
                    <button onClick={handleExit}>
                      <img src={logoutImage} className="image-small"></img>
                    </button>
                  </div>
                  <div className="cards">
                    <button onClick={handleCreatePayment} className="card">
                      <img src={getPaymentImage} className="image"></img>
                      <h5>Create Payment</h5>
                    </button>

                    <button onClick={handleProfile} className="card">
                      <img src={getProfileImage} className="image"></img>
                      <h5>My Profile</h5>
                    </button>
                    <button onClick={handleDashboard} className="card">
                      <img src={dashboardImage} className="image"></img>
                      <h5>Dashboard</h5>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

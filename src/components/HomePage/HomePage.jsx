import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, deleteCookie, setCookie } from "../../cookie-functions";
import { auth } from "../firebase";
import "./HomePage.scss";
import getPaymentImage from "../HomePage/card_images/payment-method.png";
import getProfileImage from "../HomePage/card_images/profile.png";
import logoutImage from "../HomePage/card_images/logout.png";
import dashboardImage from "../HomePage/card_images/dashboard.png"

const HomePage = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(getCookie("show-welcome"));
  const [userName, setUserName] = useState("Test");

  useEffect(() => {
    if (!getCookie("sopp-auth")) {
      navigate("/login");
    } else {

      let username = getCookie("user-displayName");
      console.log("username: " + username);
      setUserName(username);
      setShowWelcome(false);
      setTimeout(() => {
        setShowWelcome(false);
        setCookie("show-welcome", false)
      }, 3000);
      setCookie("greeted", true)
    }
    
  }, [navigate]);


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
                  <h1>{userName}'s Dashboard</h1>
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

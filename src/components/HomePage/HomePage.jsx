import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, deleteCookie } from "../../cookie-functions";
import { auth } from "../firebase";
import "./HomePage.scss";
import getPaymentImage from "../HomePage/card_images/payment-method.png";
import getProfileImage from "../HomePage/card_images/profile.png";
import logoutImage from "../HomePage/card_images/logout.png";
import hamburgerImage from "../HomePage/card_images/hamburger.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [firstName, setFirstName] = useState("Test");
  const [lastName, setLastName] = useState("Test");
  const [userName, setUserName] = useState("Test");

  useEffect(() => {
    if (!getCookie("sopp-auth")) {
      navigate("/login");
    } else {
      let username = getCookie("user-displayName");
      console.log("username: " + username);
      setUserName(username);

      setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
    }
  }, [navigate]);

  const [showMenu, setShowMenu] = useState(false);

  const handleCreatePayment = () => {
    navigate("/home/create-payment");
  };

  const handleCard2 = () => {
    // navigate("/home/payment-history");
  };

  const handleCard3 = () => {
    // console.log("Withdraw Money Clicked");
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
    console.log("Menu Toggled", !showMenu); // This will log the new state
  };

  const handleProfile = () => {
    console.log("Profile Clicked"); // Placeholder for profile functionality
    navigate("/home/profile");
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
                  <div className="menu">
                    <button onClick={handleMenuToggle}>
                      <img src={hamburgerImage} className="image-small"></img>
                    </button>
                    {showMenu && (
                      <div className="dropdown-menu">
                        <button onClick={handleProfile}>My Profile</button>
                      </div>
                    )}
                  </div>
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
                    <button className="card"></button>
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

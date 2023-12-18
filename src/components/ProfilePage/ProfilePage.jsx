import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, deleteCookie } from "../../cookie-functions";
import { auth } from "../firebase";
import getProfileImage from "../ProfilePage/src/user.png";
import backButtonImage from "../ProfilePage/src/arrow.png";
import logoutImage from "../HomePage/card_images/logout.png";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Test");

  useEffect(() => {
    if (!getCookie("sopp-auth")) {
      navigate("/login");
    } else {
      
      let merchantId = getCookie("userId")
      console.log("user id is: " + merchantId);

      
    }
  }, [navigate]);

  const handleExit = () => {
    deleteCookie("sopp-auth");
    navigate("/login");
    window.location.reload();
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div>
      <div id="profile-page">
        <div className="back-button">
          <button onClick={handleBack}>
            <img src={backButtonImage} className="image-small"></img>
          </button>
        </div>

        <div className="exit-button">
          <button onClick={handleExit}>
            <img src={logoutImage} className="image-small"></img>
          </button>
        </div>

        <div className="top-part">
          <img src={getProfileImage} className="image"></img>
        </div>
        <div className="bottom-part">
          <div className="profile-info-container">
            <h1>Profile</h1>
            <div className="input-container">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="TCKN"
                required
              />
            </div>
            <div className="input-container">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="input-container">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Surname"
                required
              />
            </div>
            <div className="input-container">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Tax Number"
                required
              />
            </div>
            <div className="input-container">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Adress"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

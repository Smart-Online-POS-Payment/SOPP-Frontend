import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, deleteCookie } from "../../cookie-functions";
import { auth } from "../firebase";
import getProfileImage from "../ProfilePage/src/user.png";
import backButtonImage from "../ProfilePage/src/arrow.png";
import logoutImage from "../HomePage/card_images/logout.png";
import "./ProfilePage.scss";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (!getCookie("sopp-auth")) {
      navigate("/login");
    } else {
      let merchantId = getCookie("userId");
      console.log("user id is: " + merchantId);
    }
    let accessToken = getCookie("sopp-auth");
    console.log(auth.currentUser);
    let merchantId = getCookie("userId");
    console.log(accessToken);
    let apiURL = `http://34.135.253.130:80/verify/customer/${merchantId}`;
    axios
      .get(apiURL,{
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data != null) {
          console.log("success");
          setUserProfile(response.data);          
        }
      })
      .catch((error) => {
        console.error("Error fetching stories:", error);
      });
  }, []);


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
                placeholder={userProfile ? userProfile.firstname : "Name..."}
                required
                readOnly
              />
            </div>
            <div className="input-container">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder={userProfile ? userProfile.surname : "Surname..."}
                required
                readOnly
              />
            </div>
            <div className="input-container">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder={
                  userProfile ? userProfile.phoneNumber : "PhoneNumber..."
                }
                required
                readOnly
              />
            </div>
            <div className="input-container">              
              <textarea className="form-control form-control-lg"                
                value={userProfile ? userProfile.openAddress : "PhoneNumber..."}
                rows="4"                
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useEffect } from "react";
import "./SplashScreen.scss";
import splashImage from "../SplashPage/sopp-logo-modified.png"

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1300);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <img
        src={splashImage}
        alt="Splash Screen Image"
        className="splash-image"
      />
    </div>
  );
};

export default SplashScreen;

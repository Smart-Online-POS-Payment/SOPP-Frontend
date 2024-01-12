// Login/Login.js
import React, { useState, useEffect } from "react";
import "./LoginPage.scss";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase";
import { setCookie, getCookie } from "../../cookie-functions";
import { useNavigate } from "react-router-dom";
import SplashScreen from "../SplashPage/SplashScreen";

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSplashFinish = () => {
    setShowLogin(true);
  };

  const navigate = useNavigate();
        useEffect(() => {
            if(getCookie('sopp-auth')){    
                navigate("/home");
            }
        },[])

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user.accessToken);
        
        const user =  userCredential.user
        if(user.emailVerified){
          const accessToken = user.accessToken;
          setCookie("sopp-auth", accessToken, 0.05);
          setCookie("user-displayName", user.displayName)
          setCookie("userId",user.uid)      
          setCookie("show-welcome", true)
          navigate("/home");
        }else{
          alert("Verify email");
        }
      })
      .catch((error) => {
        console.log("Throw error");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div>
      {!showLogin && <SplashScreen onFinish={handleSplashFinish} />}
      {showLogin && (
      <div class="container-fluid" id="login-page">
        <div class="row">
          <div class="col-4 d-flex flex-column justify-content-center align-items-center">
            <div className="login-container">
              <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="input-container">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-container">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="button-container">
                  <button
                    type="submit"
                    //onClick={handleLogin}
                    class="btn btn-primary form-control form-control-lg btn-action"
                  >
                    Login
                  </button>
                </div>
              </form>

              <div>
                <a href="register" className="register-link">
                  Not a member? Join SOPP
                </a>
              </div>
            </div>
          </div>
          <div class="col-8 sopp-color d-flex flex-column justify-content-center align-items-center">
            <div class="sopp-header">
              <h1>SOPP: Smart Online POS Payment</h1>
              <h3>Making Online Payment Easier</h3>              
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default LoginPage;

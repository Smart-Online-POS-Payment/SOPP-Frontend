// Login/Login.js
import React, { useState } from "react";
import "./LoginPage.css";
import {  signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log(userCredential)
        })
        .catch((error) => {
          console.log("Throw error")
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });



  };

  return (
    <div>
      <div class="container-fluid">
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
              <h3>Making Online Banking Easier</h3>

              <a href="#details">Learn More about SOPP</a>
            </div>
          </div>
        </div>
      </div>
      <h1 id="details">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </h1>
    </div>
  );
};

export default LoginPage;

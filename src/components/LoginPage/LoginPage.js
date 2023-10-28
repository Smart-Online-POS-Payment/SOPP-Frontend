// Login/Login.js
import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("User ID:", userId);
    console.log("Password:", password);
  };

  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-4 d-flex flex-column justify-content-center align-items-center">
            <div className="login-container">
              <h2>Login</h2>
              <div className="input-container">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Turkish ID Number"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="input-container">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="button-container">
                <button
                  onClick={handleLogin}
                  class="btn btn-primary form-control form-control-lg btn-action"
                >
                  Login
                </button>
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

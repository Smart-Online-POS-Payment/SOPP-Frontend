import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./RegisterPage.css";
import { setCookie, getCookie } from "../../cookie-functions";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
        useEffect(() => {
            if(getCookie('sopp-auth')){    
                navigate("/home");
            }
        },[])

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        const userId = userCredential.user.uid;
        setCookie("sopp-auth", userId, 0.5);
        window.location.reload();
      })

      
      .catch((error) => {
        console.log("Throw error");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(error.message);
        // ..
      });
  };

  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <div className="holder d-flex flex-column justify-content-center align-items-center">
            <div className="register-form-container">
              <form onSubmit={handleRegister}>
                <h2>Register</h2>
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
                    className="btn btn-primary form-control form-control-lg btn-action"
                  >
                    Register
                  </button>
                </div>
                <div>
                  <a href="login" className="register-link">
                    Already a member? Login to SOPP
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

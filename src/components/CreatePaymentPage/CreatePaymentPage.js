import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCookie } from "../../cookie-functions";
import "./CreatePaymentPage.scss";
import { auth } from "../firebase";

const CreatePaymentPage = () => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentDescription, setPaymentDescription] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!getCookie("sopp-auth")) {
      navigate("/home");
    }
  }, []);

  const goBack = () => {
    navigate("/home");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let merchantId = auth.currentUser.uid
    let accessToken = getCookie('sopp-auth')
    axios
  .post("http://localhost:8083/payment/payment-request", {
    merchantId: merchantId,
    paymentAmount: paymentAmount,
    paymentMessage: paymentDescription,
  }, {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    if (response.status === 200) {
      // Redirect to QR page after receiving UUID
      console.log(response.data);
      window.location.href = "/home/qr/" + response.data;
    } else {
      console.error("Error creating payment request:", response.data.error);
    }
  })
  .catch((error) => {
    console.error("Request failed:", error);
  });
    
  
  };

  return (
    <div>
      <div class="container-fluid" id="create-payment-page">
        <div class="row">
          <div className="holder d-flex flex-column justify-content-center align-items-center">
            <div className="create-payment-container">
              <form onSubmit={handleSubmit}>
                <h2>Create Payment</h2>
                <div className="input-container">
                  <input
                    class="form-control form-control-lg"
                    type="number"
                    placeholder="Payment Amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="input-container">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Payment Description"
                    value={paymentDescription}
                    onChange={(e) => setPaymentDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="button-container">
                  <button
                    type="submit"
                    class="btn btn-primary form-control form-control-lg btn-action"
                  >
                    Create Payment
                  </button>
                </div>
                <div className="button-container">
                  <button
                  onClick={goBack}
                    type="button"
                    class="btn btn-light btn-back form-control form-control-lg btn-action"
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePaymentPage;

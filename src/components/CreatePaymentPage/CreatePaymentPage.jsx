import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCookie } from "../../cookie-functions";
import "./CreatePaymentPage.scss";

const CreatePaymentPage = () => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentDescription, setPaymentDescription] = useState("");
  const [category, setCategory]= useState("Other")

  const navigate = useNavigate();
  useEffect(() => {
    if (!getCookie("sopp-auth")) {
      navigate("/home");
    }
  }, []);

  const goBack = () => {
    navigate("/home");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let merchantId = getCookie("userId");
    let accessToken = getCookie("sopp-auth");
    axios
      .post(
        "http://localhost:8083/payment/payment-request",
        {
          merchantId: merchantId,
          paymentAmount: paymentAmount,
          category: category,
          paymentMessage: paymentDescription,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
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
                  {/* <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg> */}
                  <select
                    id="dropdown"
                    name="dropdown"
                    className="form-control form-control-lg"
                    onChange={(e)=>setCategory(e.target.value)}
                  >
                    <option selected>Choose Category</option>

                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Tickets">Tickets</option>
                    <option value="CarRentals">Car Rentals</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Coffee">Coffee</option>
                    <option value="Charity">Charity</option>
                    <option value="Rent">Rent</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Other">Other</option>
                  </select>
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

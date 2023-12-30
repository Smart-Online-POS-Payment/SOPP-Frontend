import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../../cookie-functions";
import "./RefundRequestsPage.scss";
import { ListGroup, Button } from "react-bootstrap";
import backButtonImage from "../ProfilePage/src/arrow.png";

function RefundRequestsPage() {
  function handleRefund(id) {
    let accessToken = getCookie("sopp-auth");
    axios.put(`http://localhost:8083/payment/refund/${paymentHistory[id].transactionId}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        // Refresh the page upon successful response
        window.location.reload();
      } else {
        // Handle other success status codes if needed
        alert("Refund request failed. Please try again.");
      }    })
    .catch((error) => {
      console.error("Error fetching stories:", error);
    });
  }

  const [paymentHistory, setPaymentHistory] = useState([]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home/dashboard");
  };

  useEffect(() => {
    if (!getCookie("sopp-auth")) {
      navigate("/home");
    }
    let accessToken = getCookie("sopp-auth");
    let merchantId = getCookie("userId");
    console.log(accessToken);
    axios
      .get(
        `http://localhost:8083/payment/refund/request/merchant/${merchantId}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data != null) {
          setPaymentHistory(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching stories:", error);
      });
  }, []);

  const getRandomNumber = () => {
    const min = 50;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "Amount: " + Math.floor(randomNumber / 5) * 5;
  };

  const getCategory = () => {
    const categories = [
      "Groceries",
      "Clothing",
      "Electronics",
      "Tickets",
      "CarRentals",
      "Restaurants",
      "Coffee",
      "Charity",
      "Rent",
      "Gaming",
      "Other",
    ];

    const randomIndex = Math.floor(Math.random() * categories.length);
    return "Category: " + categories[randomIndex];
  };

  const generateMockData = () => {
    const mockData = [];

    for (let i = 1; i <= 50; i++) {
      mockData.push([
        getRandomNumber(),
        getCategory(),
        "customerID", // Format the current time
        "Forgot",
      ]);
    }

    return mockData;
  };

  const mockData = generateMockData();

  return (
    <div>
      <div id="payment-history-page">
      <h1>Refund Requests</h1>

      <div className="back-button">
          <button onClick={handleBack}>
            <img src={backButtonImage} className="image-small"></img>
          </button>
        </div>
        <div className="container">
          <div className="wrapper">
            <div className="accordion">
              {paymentHistory.map((item, i) => (
                <div className="item">
                  <div className="list-row">
                    <span>Category: {item.category}</span>
                    <span>Amount: {item.amount}</span>
                    <span>CustomerId: {item.customerId}</span>
                    <Button
                      onClick={() => handleRefund(i)}
                      className="list-btn-detail"
                    >
                      Make refund
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefundRequestsPage;

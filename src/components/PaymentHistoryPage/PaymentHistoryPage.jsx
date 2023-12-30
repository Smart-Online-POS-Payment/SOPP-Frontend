import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../cookie-functions";
import backButtonImage from "../ProfilePage/src/arrow.png";
import "./PaymentHistoryPage.scss";
import moment from "moment";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

function PaymentHistoryPage() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showTextField, setShowTextField] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleBack = () => {
    navigate("/home/dashboard");
  };

  function toggleDisplayById(id) {
    const elementId = "text-field-" + id;
    const element = document.getElementById(elementId);
    console.log(element);

    if (element) {
      // Toggle the display attribute
      element.style.display =
        element.style.display === "none" ? "block" : "none";
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!getCookie("sopp-auth")) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    let accessToken = getCookie("sopp-auth");
    //let merchantId = auth.currentUser.uid
    console.log("user id issss: " + getCookie("userId"));
    let api =
      "http://localhost:8083/payment/payment-order/merchant/" +
      getCookie("userId");

    axios
      .get(api, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data != null) {
          console.log(response.data);
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
      mockData.push([getRandomNumber(), getCategory(), "some-time", "Forgot"]);
    }

    return mockData;
  };

  //const mockData = generateMockData();
  const mockData = [
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
    {
      amount: "60",
      category: "electronics",
      time: "some-time",
      detail: "some-detail",
    },
  ];

  function handleDetail(id) {
    if (selected === id) {
      return setSelected(null);
    }
    setSelected(id);
  }

  return (
    <div>
      <div id="payment-history-page">
        <h1>Payment History</h1>
        <div className="back-button">
          <button onClick={handleBack}>
            <img src={backButtonImage} className="image-small"></img>
          </button>
        </div>
        <div className="container">
          <div className="wrapper">
            <div className="accordion">
              {mockData.map((item, i) => (
                <div className="item">
                  <div className="list-row">
                    <span>Category: {item.category}</span>
                    <span>Amount: {item.amount}</span>
                    <span>TIme: {item.time}</span>
                    <Button
                      onClick={() => handleDetail(i)}
                      className="list-btn-detail"
                    >
                      See Details
                    </Button>
                  </div>
                  <div className={selected === i ? "details show" : "details"}>
                    {item.detail}
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

export default PaymentHistoryPage;

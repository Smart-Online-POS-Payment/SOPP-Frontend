import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../cookie-functions";
import { auth } from "../firebase";
import "../DashboardPage/DashboardPage.scss";
import moment from 'moment';

function DashboardPage() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showTextField, setShowTextField] = useState(false);
  // const [clickedRowIndex, setClickedRowIndex] = useState(null);

  const handleButtonClick = (index) => {
    console.log("clickedRowIndex is: " + index);
  };

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
    console.log("request from: " + api);

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

  const generateMockData = () => {
    const mockData = [];

    for (let i = 1; i <= 50; i++) {
      mockData.push([
        getRandomNumber(),
        getCategory(),
        "Time: " + moment().format("HH:mm:ss"), // Format the current time
        "Forgot",
      ]);
    }

    return mockData;
  };

  const mockData = generateMockData();

  return (
    <div>
      <div id="payment-history-page">
        <div className="container">
          <ListGroup style={{ display: "flex", flexDirection: "column" }}>
            {mockData.map((innerArray, outerIndex) => (
              <div key={outerIndex} style={{ position: "relative" }}>
                <ListGroup.Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  {innerArray.map((str, innerIndex) => (
                    <span key={innerIndex}>
                      {innerIndex === innerArray.length - 1 ? (
                        <Button
                          variant="primary"
                          onClick={() => toggleDisplayById(outerIndex)}
                        >
                          Detail: {outerIndex}
                        </Button>
                      ) : (
                        str
                      )}
                    </span>
                  ))}
                </ListGroup.Item>

                <textarea
                  id={`text-field-${outerIndex}`}
                  className="form-control form-control-lg"
                  value={"Mock detail for mock item no: " + outerIndex}
                  rows="1"
                  readOnly
                  style={{
                    display: "none",
                  }}
                ></textarea>
              </div>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

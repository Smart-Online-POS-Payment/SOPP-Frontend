import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../../cookie-functions";
import "./RefundRequestsPage.scss";
import { ListGroup, Button } from "react-bootstrap";
import backButtonImage from "../ProfilePage/src/arrow.png";

function RefundRequestsPage() {
  function handleRefund(id) {
    console.log("Refund clicked for item: " + id);
  }

  function toggleDisplayById(id) {
    const elementId = "text-field-" + id;
    const element = document.getElementById(elementId);
    console.log(element);

    if (element) {
      // Toggle the display attribute
      element.style.display =
        element.style.display === "none" ? "block" : "none";

      if (element) {
        element.classList.add("row-detail-visible");
      }
    }
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
      <div id="refund-history-page">
        <div className="back-button">
          <button onClick={handleBack}>
            <img src={backButtonImage} className="image-small"></img>
          </button>
        </div>
        <div className="container">
          <h1>Refund Requests</h1>
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
                  className="list-row"
                >
                  {innerArray.map((str, innerIndex) => (
                    <span key={innerIndex}>
                      {innerIndex === innerArray.length - 1 ? (
                        <div>
                          <Button
                            variant="secondary"
                            onClick={() => handleRefund(outerIndex)}
                            className="list-btn-refund"
                          >
                            Complete Refund
                          </Button>
                        </div>
                      ) : (
                        str
                      )}
                    </span>
                  ))}
                </ListGroup.Item>

                <textarea
                  id={`text-field-${outerIndex}`}
                  className="form-control form-control-lg row-detail"
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

export default RefundRequestsPage;

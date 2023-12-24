import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../cookie-functions";
import "../DashboardPage/DashboardPage.scss";

function DashboardPage() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showTextField, setShowTextField] = useState(false);
  // const [clickedRowIndex, setClickedRowIndex] = useState(null);


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


  return (
    <div>
      <div id="payment-history-page">
        <div className="container">
          <ListGroup style={{ display: "flex", flexDirection: "column" }}>
            {paymentHistory.map((paymentItem, index) => (
              <div key={index} style={{ position: "relative" }}>
                <ListGroup.Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  {Object.values(paymentItem).map((value, innerIndex) => (
                    <span key={innerIndex}>
                      {innerIndex === Object.values(paymentItem).length - 1 ? (
                        <Button
                          variant="primary"
                          onClick={() => toggleDisplayById(index)}
                        >
                          Detail: {index}
                        </Button>
                      ) : (
                        value
                      )}
                    </span>
                  ))}
                </ListGroup.Item>
  
                <textarea
                  id={`text-field-${index}`}
                  className="form-control form-control-lg"
                  value={paymentItem.date}
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

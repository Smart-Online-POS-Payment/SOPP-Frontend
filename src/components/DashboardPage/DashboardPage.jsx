import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../cookie-functions";
import "../DashboardPage/DashboardPage.scss";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import refundImage from "../DashboardPage/card_images/refund.png";
import transactionsImage from "../DashboardPage/card_images/transaction.png";

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

  const handlePaymentHistory = () => {
    navigate("/home/payment-history");
  };

  const handleRefundRequests = () => {
    navigate("/home/refund-requests");
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!getCookie("sopp-auth")) {
      navigate("/home");
    }
  }, []);

  const data = [
    { value: 1550, label: "Electronics" },
    { value: 1000, label: "Charity" },
    { value: 150, label: "Coffee" },
    { value: 450, label: "Other" },
    { value: 1000, label: "Gaming" },
  ];

  const size = {
    width: 600,
    height: 600,
  };

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 20,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

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
      <div id="dashboard-page">
        <div className="container">
          {/* <h1>Dashboard</h1> */}

          <div className="container-fluid">
            <div className="row">
              <div className="col-8 d-flex flex-column justify-content-center align-items-center">
                <div className="pie-chart-container">
                  <PieChart
                    colors={["cyan", "navy", "grey"]}
                    series={[
                      {
                        data,
                        innerRadius: 80,
                        outerRadius: 200,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: 0,
                        endAngle: 360,
                      },
                    ]}
                    {...size}
                  >
                    <PieCenterLabel>Sales</PieCenterLabel>
                  </PieChart>
                </div>
              </div>

              <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                <div className="cards-container">
                  <div className="cards">
                    <button onClick={handlePaymentHistory} className="card">
                      <img src={transactionsImage} className="image"></img>
                      <h5>Payment History</h5>
                    </button>

                    <button onClick={handleRefundRequests} className="card">
                      <img src={refundImage} className="image"></img>
                      <h5>Refund Requests</h5>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

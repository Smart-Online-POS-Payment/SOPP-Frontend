import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../../cookie-functions';
import "./RefundRequestsPage.scss"
import { ListGroup, Button } from "react-bootstrap";

function RefundRequestsPage() {
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
    const [paymentHistory, setPaymentHistory] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!getCookie('sopp-auth')){    
            navigate("/home");
        }
        let accessToken = getCookie('sopp-auth')
        let merchantId = getCookie('userId')
        console.log(accessToken)
        axios.get(`http://localhost:8083/payment/refund/request/merchant/${merchantId}`, {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
            console.log(response.data)
            if(response.data!=null){
              setPaymentHistory(response.data)
            }
        })
        .catch((error) => {
            console.error('Error fetching stories:', error);
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

export default RefundRequestsPage
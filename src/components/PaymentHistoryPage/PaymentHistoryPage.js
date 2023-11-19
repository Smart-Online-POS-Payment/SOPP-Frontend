import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../cookie-functions';
import { auth } from "../firebase";

function PaymentHistoryPage() {
    const [paymentHistory, setPaymentHistory] = useState([]);

    const navigate = useNavigate();
        useEffect(() => {
            if(!getCookie('sopp-auth')){    
                navigate("/home");
            }
        },[])

    useEffect(() => {
        let accessToken = getCookie('sopp-auth')
        let merchantId = auth.currentUser.uid
        console.log(accessToken)
        axios.get(`http://localhost:8083/payment/payment-order/merchant/${merchantId}`, {
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
    <h2>Payment History</h2>
    <ListGroup as="ol" numbered>
      {paymentHistory.map((entry, index) => (
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          key={index}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{"Message: " + entry.paymentMessage}</div>
          </div>
          <div className="ms-2 me-auto">
            <div className="text-muted">{"Amount: "+entry.paymentAmount}</div>
          </div>
          <div className="text-muted">{"Date: " + entry.paymentDate}</div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
  )
}

export default PaymentHistoryPage
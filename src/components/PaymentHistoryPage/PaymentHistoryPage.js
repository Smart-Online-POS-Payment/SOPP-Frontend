import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

function PaymentHistoryPage() {
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(() => {
        console.log("Entered")
        axios.get('http://localhost:8083/payment/payment-order/merchant/76519d38-0cad-42d0-be28-fded94d8f367')
        .then((response) => {
            console.log(response)
            setPaymentHistory(response.data)
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../cookie-functions';
import { auth } from "../firebase";

function RefundRequestsPage() {
    const [refundRequests, setRefundRequests] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!getCookie('sopp-auth')){    
            navigate("/home");
        }
        let accessToken = getCookie('sopp-auth')
        let merchantId = auth.currentUser.uid
        console.log(accessToken)
        axios.get(`http://localhost:8083/payment/refund/merchant/${merchantId}`, {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
            console.log(response.data)
            if(response.data!=null){
              setRefundRequests(response.data)
            }
        })
        .catch((error) => {
            console.error('Error fetching stories:', error);
        });
    }, []);
  return (
    <div>
        <h1>Refund Requests</h1>
        {refundRequests.map((request) => (
            <div key={request.id} style={{ display: 'inline-block', marginRight: '10px' }}>
            <p>Category: {request.category}</p>
            <p>Description: {request.description}</p>
            <p>Amount: {request.amount}</p>
            </div>
        ))}
    </div>
  )
}

export default RefundRequestsPage
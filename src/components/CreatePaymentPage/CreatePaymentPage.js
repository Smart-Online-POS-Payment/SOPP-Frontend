import React, { useState } from 'react';
import axios from 'axios';

const CreatePaymentPage = () => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentDescription, setPaymentDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let merchantId = "76519d38-0cad-42d0-be28-fded94d8f367" // ToDO: take merchant id from cookies
    axios.post('http://localhost:8083/payment/payment-request', {
        merchantId: merchantId,
        paymentAmount: paymentAmount,
        paymentMessage: paymentDescription,
    }).then((response)=>{
        if (response.status === 200) {
            // Redirect to QR page after receiving UUID
            console.log(response.data)
            window.location.href = '/home/qr/' + response.data;
          } else {
            console.error('Error creating payment request:', response.data.error);
          }
    });
  };

  return (
    <div>
      <h2>Create Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>Payment Amount:</label>
        <input
          type="number"
          value={paymentAmount}
          onChange={(event) => setPaymentAmount(event.target.value)}
        />

        <label>Payment Description:</label>
        <input
          type="text"
          value={paymentDescription}
          onChange={(event) => setPaymentDescription(event.target.value)}
        />

        <button type="submit">Create Payment</button>
      </form>
    </div>
  );
};

export default CreatePaymentPage;
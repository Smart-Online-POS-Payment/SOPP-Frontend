import React from 'react';
import QRCode from 'react-qr-code';
import {useParams} from 'react-router-dom'

function QrCodeView() {
  const data = useParams();
  const qrcode = <QRCode value={data.uuid} size={256} />;


  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    height: '100vh', // Adjust the height to your requirements
  };

  return (
    <div style={containerStyle}>
      <h2>Make Payment</h2>
      <div>{qrcode}</div>
    </div>
  );
}

export default QrCodeView;
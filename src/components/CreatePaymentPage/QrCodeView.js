import React from 'react';
import QRCode from 'react-qr-code';
import {useParams} from 'react-router-dom'
import "./QRCodeView.css";

function QrCodeView() {
  const data = useParams();
  //const qrcode = <QRCode value={data.uuid} size={256} className="qrcode" />;

  return (
    <div className="container">
      <div className="qrcode-container">
        <h2 className="title">Make Payment</h2>
        <div>
          <QRCode value={data.uuid} size={256} className="qrcode" />
        </div>
      </div>
    </div>
  );
}


export default QrCodeView;
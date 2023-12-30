import { React, useEffect } from "react";
import QRCode from "react-qr-code";
import { useParams, useNavigate } from "react-router-dom";
import "./QRCodeView.scss";
import { getCookie } from "../../cookie-functions";

function QrCodeView() {
  const data = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (!getCookie("sopp-auth")) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div id="qr-code-view-page">
        <div className="container">
          <div className="qrcode-container">
            <h2 className="title">Scan it</h2>
            <div>
              <QRCode value={data.uuid} size={256} className="qrcode" />
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default QrCodeView;

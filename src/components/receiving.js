/** @format */
import axios from "axios";
import React, { useState } from "react";
import QrReader from "react-qr-reader";

const Receiving = () => {
  const [readQRcode, setReadQRcode] = useState(null);

  const handleScanError = error => {
    console.log("scan error ", error);
  };

  const handleScan = scan => {
    if (scan && readQRcode === null) {
      setReadQRcode(scan);
    }
  };

  const cancelReceiving = e => {
    e.preventDefault();
    setReadQRcode(null);
  };

  const acceptReceived = e => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_REMOTE_API_URL}QR/receiving`,
      data: {
        orderDetails: readQRcode,
      },
      responseType: "json",
    })
      .then(result => {
        console.log("receiving post result", result);
        setReadQRcode(null);
      })
      .catch(err => {
        console.log("receiving post failed", err);
        setReadQRcode(null);
      });
  };

  return (
    <div>
      <h3>RECEIVING SCANNER</h3>
      <QrReader
        delay={300}
        style={{ width: "400px", height: "400px" }}
        onError={handleScanError}
        onScan={handleScan}
        facingMode={"environment"}
        showViewFinder={true}
      />
      <div>{"Scanned QR: " + readQRcode}</div>
      <div style={{ display: readQRcode ? "block" : "none" }}>
        <button onClick={event => acceptReceived(event)}>RECEIVE</button>
        <button onClick={event => cancelReceiving(event)}>Cancel</button>
      </div>
    </div>
  );
};

export default Receiving;

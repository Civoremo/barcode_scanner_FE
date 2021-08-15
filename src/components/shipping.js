/** @format */

import axios from "axios";
import React, { useState } from "react";
import QrReader from "react-qr-reader";
// import ReadQR from "react-qr-barcode-scanner";

const Shipping = () => {
  const [readQRcode, setReadQRcode] = useState(null);
  //   const qrReaderRef = useRef(null);

  const sendShippingOrder = e => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_REMOTE_API_URL}QR/shipping`,
      data: { orderDetails: readQRcode },
      responseType: "json",
    })
      .then(result => {
        console.log("shipping post result", result);
        setReadQRcode(null);
      })
      .catch(err => {
        console.log("shipping post failed", err);
        setReadQRcode(null);
      });
  };

  const handleScanError = error => {
    console.log("scan error", error);
  };

  const handleScan = scan => {
    if (scan && readQRcode === null) {
      //   console.log("scan result", scan);
      setReadQRcode(scan);
    }
  };

  const cancelShipping = e => {
    e.preventDefault();
    setReadQRcode(null);
  };

  return (
    <div>
      <h3>SHIPPING SCANNER</h3>
      <QrReader
        // ref={qrReaderRef}
        delay={300}
        style={{ width: "400px", height: "400px" }}
        onError={handleScanError}
        onScan={handleScan}
        facingMode={"environment"}
        showViewFinder={true}
      />
      <div>{"Scanned QR: " + readQRcode}</div>
      <div style={{ display: readQRcode ? "block" : "none" }}>
        <button onClick={event => sendShippingOrder(event)}>SHIP</button>
        <button onClick={event => cancelShipping(event)}>Cancel</button>
      </div>
    </div>
  );
};

export default Shipping;

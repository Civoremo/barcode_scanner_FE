/** @format */

import axios from "axios";
import React, { useState } from "react";
import QrReader from "react-qr-reader";
import Button from "@material-ui/core/Button";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#222",
        paddingBottom: "40px",
      }}
    >
      <h3 style={{ color: "#fff" }}>SHIPPING SCANNER</h3>
      <QrReader
        // ref={qrReaderRef}
        delay={300}
        style={{ width: "400px", height: "400px" }}
        onError={handleScanError}
        onScan={handleScan}
        facingMode={"environment"}
        showViewFinder={true}
      />
      {/* <div>{"Scanned QR: " + readQRcode}</div> */}
      <div
        style={{
          position: "absolute",
          top: "550px",
          display: readQRcode ? "flex" : "flex",
          justifyContent: "space-around",
          minWidth: "300px",
          maxWidth: "450px",
          // border: "1px solid red",
        }}
      >
        <Button
          variant='contained'
          color='primary'
          onClick={event => sendShippingOrder(event)}
          style={{ width: "150px", height: "50px" }}
        >
          SHIP
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={event => cancelShipping(event)}
        >
          Cancel
        </Button>
      </div>
      <div
        style={{
          position: "absolute",
          top: "400px",
          background: "grey",
          // border: "2px solid green",
          width: "260px",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            minHeight: "80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            // border: "1px solid red",
          }}
        >
          <div>Processing</div>
          <div>order info</div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;

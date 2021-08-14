/** @format */

import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";
import ReadQR from "react-qr-barcode-scanner";

const Shipping = () => {
  const [readQRcode, setReadQRcode] = useState(null);
  //   const qrReaderRef = useRef(null);

  const handleScanError = error => {
    console.log("scan error", error);
  };

  const handleScan = scan => {
    if (scan) {
      //   console.log("scan result", scan);
      setReadQRcode(scan);
    }
  };

  return (
    <div>
      <div>shipping scanner component</div>
      {/* <ReadQR
        delay={300}
        width={400}
        height={400}
        facingMode={"environment"}
        stopStream={readQRcode ? true : false}
        onUpdate={(err, result) => {
          if (result) setReadQRcode(result);
          else console.log("not found");
        }}
      /> */}
      <QrReader
        // ref={qrReaderRef}
        delay={300}
        style={{ width: "400px", height: "400px" }}
        onError={handleScanError}
        onScan={handleScan}
        // onLoad={true}
        // facingMode={"user"}
      />
      <div>{"Scanned QR: " + readQRcode}</div>
    </div>
  );
};

export default Shipping;

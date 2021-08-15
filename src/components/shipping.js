/** @format */

import React, { useState } from "react";
import QrReader from "react-qr-reader";
// import ReadQR from "react-qr-barcode-scanner";

const Shipping = () => {
  const [readQRcode, setReadQRcode] = useState(null);
  //   const qrReaderRef = useRef(null);

  const handleScanError = error => {
    console.log("scan error", error);
  };

  const handleScan = scan => {
    if (scan && readQRcode === null) {
      //   console.log("scan result", scan);
      setReadQRcode(scan);
    }
  };

  return (
    <div>
      <div>shipping scanner component</div>
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
        <button>Accept</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default Shipping;

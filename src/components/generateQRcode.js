/** @format */

import React, { useState } from "react";
import QRcode from "qrcode";

const GenerateQRcode = () => {
  const [textForQRgenerate, setTextForQRgenerate] = useState("");
  const [generatedQR, setgeneratedQR] = useState(null);

  const generate = e => {
    e.preventDefault();
    QRcode.toDataURL(textForQRgenerate)
      .then(result => {
        console.log("qr result", result);
        setgeneratedQR(result);
      })
      .catch(err => {
        console.log("failed to generate qr");
      });
  };

  return (
    <div>
      <div>generate qr code component</div>
      <div>
        <input
          type='text'
          name='QR text'
          placeholder='Enter text for QR generation'
          value={textForQRgenerate}
          onChange={event => setTextForQRgenerate(event.target.value)}
        />
        <button onClick={event => generate(event)}>Generate QR</button>
      </div>
      <br />
      <br />
      <div>
        {generatedQR ? <img src={generatedQR} alt='generated qr code' /> : null}
      </div>
    </div>
  );
};

export default GenerateQRcode;

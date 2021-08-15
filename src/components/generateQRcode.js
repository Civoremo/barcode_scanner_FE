/** @format */

import React, { useState } from "react";
import QRcode from "qrcode";

const GenerateQRcode = () => {
  const [textForQRgenerate, setTextForQRgenerate] = useState({
    product: "",
    created: "",
    location: "",
  });
  const [generatedQR, setgeneratedQR] = useState(null);

  const generate = e => {
    e.preventDefault();
    //   console.log(textForQRgenerate);
    let tempArr = [];
    tempArr.push(textForQRgenerate);

    QRcode.toDataURL(JSON.stringify(tempArr))
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
          name='product'
          placeholder='Enter product name'
          value={textForQRgenerate.product}
          onChange={event =>
            setTextForQRgenerate(textForQRgenerate => ({
              ...textForQRgenerate,
              [event.target.name]: event.target.value,
            }))
          }
        />
        <input
          type='text'
          name='created'
          placeholder='Enter creator name'
          value={textForQRgenerate.created}
          onChange={event =>
            setTextForQRgenerate(textForQRgenerate => ({
              ...textForQRgenerate,
              [event.target.name]: event.target.value,
            }))
          }
        />
        <input
          type='text'
          name='location'
          placeholder='Enter location'
          value={textForQRgenerate.location}
          onChange={event =>
            setTextForQRgenerate(textForQRgenerate => ({
              ...textForQRgenerate,
              [event.target.name]: event.target.value,
            }))
          }
        />
        <button onClick={event => generate(event)}>Generate QR</button>
      </div>
      <br />
      <br />
      <div>
        {generatedQR ? (
          <a href={generatedQR} download>
            <img src={generatedQR} alt='generated qr code' />
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default GenerateQRcode;

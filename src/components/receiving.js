/** @format */
import axios from "axios";
import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { Button, Paper, CircularProgress } from "@material-ui/core";

const Receiving = () => {
  const [readQRcode, setReadQRcode] = useState(null);
  const [formatedQRinfo, setFormatedQRinfo] = useState(null);
  const [postStatus, setPostStatus] = useState(false);
  const [sending, setSending] = useState(false);

  const handleScanError = error => {
    console.log("scan error ", error);
  };

  const handleScan = scan => {
    if (scan && readQRcode === null) {
      setReadQRcode(scan);
      setFormatedQRinfo(JSON.parse(scan));
    }
  };

  const cancelReceiving = e => {
    e.preventDefault();
    setReadQRcode(null);
    setFormatedQRinfo(null);
  };

  const acceptReceivedOrder = e => {
    e.preventDefault();
    setSending(true);
  };

  useEffect(() => {
    if (sending) {
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
          if (result.status === 201) {
            setPostStatus(true);
            setReadQRcode(null);
            setSending(false);
            timerCloseSuccess();
          } else {
            setPostStatus(null);
          }
        })
        .catch(err => {
          console.log("receiving post failed", err);
          setReadQRcode(null);
          setReadQRcode(null);
        });
    }
  }, [sending]);

  const timerCloseSuccess = () => {
    setTimeout(() => {
      setPostStatus(false);
      setFormatedQRinfo(null);
    }, 1000);
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
      <h3 style={{ color: "#fff" }}>RECEIVING SCANNER</h3>
      <QrReader
        delay={300}
        style={{ width: "400px", height: "400px" }}
        onError={handleScanError}
        onScan={handleScan}
        facingMode={"environment"}
        showViewFinder={true}
      />
      <div
        style={{
          position: "absolute",
          top: "550px",
          display: readQRcode ? "flex" : "none",
          justifyContent: "space-around",
          minWidth: "300px",
          maxWidth: "450px",
          zIndex: 10,
        }}
      >
        <Button
          variant='contained'
          color='primary'
          style={{ width: "150px", height: "50px" }}
          onClick={event => acceptReceivedOrder(event)}
        >
          RECEIVE
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={event => cancelReceiving(event)}
        >
          Cancel
        </Button>
      </div>
      <Paper
        style={{
          position: "absolute",
          top: "400px",
          background: "grey",
          width: "260px",
          height: "100px",
          display: formatedQRinfo ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
        elevation={3}
      >
        <div
          style={{
            minHeight: "80px",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {postStatus ? (
            <div
              style={{
                color: "lightgreen",
                fontWeight: "bolder",
                letterSpacing: "5px",
                fontSize: "18px",
                height: "40px",
              }}
            >
              SUCCESS
            </div>
          ) : (
            <div
              style={{
                height: "40px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ display: sending ? "block" : "none" }}>
                <CircularProgress style={{ width: "30px", height: "30px" }} />
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* {readQRcode} */}
            <div>
              {formatedQRinfo
                ? `${formatedQRinfo[1].order_number}-${formatedQRinfo[2].id}`
                : ""}
            </div>

            <div>
              {formatedQRinfo ? `${formatedQRinfo[2].product_name}` : ""}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Receiving;

/** @format */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Scans = () => {
  const [scanData, setScanData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_REMOTE_API_URL}QR/scanInfo/${id}`,
      responseType: "json",
    })
      .then(result => {
        console.log("scan data", result);
        setScanData(result.data);
      })
      .catch(err => {
        console.log("scan data failed");
      });
  }, [id]);

  const displayShippingData = () => {
    if (scanData[1].length > 0) {
      return scanData[1].map(item => {
        let dateTime = new Date(item.created_at).toString();
        const index = dateTime.indexOf("G");
        dateTime = dateTime.slice(0, index);

        return (
          <div
            key={item.id}
            style={{
              background: "salmon",
              minWidth: "200px",
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {dateTime}
          </div>
        );
      });
    }
  };

  const displayReceivedData = () => {
    if (scanData[2].length > 0) {
      return scanData[2].map(item => {
        let dateTime = new Date(item.created_at).toString();
        const index = dateTime.indexOf("G");
        dateTime = dateTime.slice(0, index);

        return (
          <div
            key={item.id}
            style={{
              background: "lightgreen",
              minWidth: "200px",
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {dateTime}
          </div>
        );
      });
    }
  };

  if (scanData === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      {/* <div>scan component</div> */}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h4>{scanData[0][0].id}</h4>
        <h4>{scanData[0][0].product_name}</h4>
        <h4>{scanData[0][0].product_number}</h4>
      </div>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h3>Shipped</h3>
          {displayShippingData()}
        </div>
        <div>
          <h3>Received</h3>
          {displayReceivedData()}
        </div>
      </div>
    </div>
  );
};

export default Scans;

/** @format */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [ordersData, setOrdersData] = useState(null);
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_REMOTE_API_URL}QR/orders/all`,
      responseType: "json",
    })
      .then(result => {
        console.log("orders result", result);
        setOrdersData(result.data);
      })
      .catch(err => {
        console.log("orders fetch failed");
      });
  }, []);

  const displayOrders = () => {
    return ordersData.map(order => {
      return (
        <div
          key={order.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid grey",
          }}
        >
          <Link
            to={`/orders/scans/${order.product_id}`}
            style={{ width: "20%" }}
          >
            Check Scans
          </Link>
          <div style={{ width: "20%" }}>{order.order_number}</div>
          <div style={{ width: "20%" }}>{order.product_id}</div>
          <div style={{ width: "20%", paddingRight: "50px" }}>
            <a href={order.QRcode}>
              <img src={order.QRcode} alt={order.id + order.order_number} />
            </a>
          </div>
        </div>
      );
    });
  };

  if (ordersData === null) {
    return <>Loading ...</>;
  }

  return (
    <div>
      {/* <div>orders component goes here</div> */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "20%" }}>SCANS</div>
          <div style={{ width: "20%" }}>ORDER NUMBER</div>
          <div style={{ width: "20%" }}>PRODUCT ID</div>
          <div style={{ width: "20%" }}>QR CODE</div>
        </div>
        <hr />
        <br />

        <div>{displayOrders()}</div>
      </div>
    </div>
  );
};

export default Orders;

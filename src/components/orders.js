/** @format */
import axios from "axios";
import React, { useState, useEffect } from "react";

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
          <div style={{ width: "30%" }}>{order.order_number}</div>
          <div style={{ width: "30%" }}>{order.product_id}</div>
          <div style={{ width: "30%" }}>
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
          <div style={{ width: "30%" }}>ORDER NUMBER</div>
          <div style={{ width: "30%" }}>PRODUCT ID</div>
          <div style={{ width: "30%" }}>QR CODE</div>
        </div>
        <hr />
        <br />

        <div>{displayOrders()}</div>
      </div>
    </div>
  );
};

export default Orders;

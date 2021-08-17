/** @format */

import { Link, Route } from "react-router-dom";

import Shipping from "./components/shipping";
import Receiving from "./components/receiving";
import GenerateQRcode from "./components/generateQRcode";
import Orders from "./components/orders";
import Scans from "./components/scans";

function App() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3>QR Code Scanner</h3>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* <Link to='generateQR'>Generate QR</Link> */}
        <Link to='/orders'>Orders</Link>
        <Link to='/shipping'>Shipping</Link>
        <Link to='/receiving'>Receiving</Link>
      </div>
      <br />
      <hr />
      <br />
      <div>
        <Route path='/generateQR' render={props => <GenerateQRcode />} />
        <Route exact={true} path='/orders' render={props => <Orders />} />
        <Route path='/shipping' render={props => <Shipping />} />
        <Route path='/receiving' render={props => <Receiving />} />
        <Route path={`/orders/scans/:id`} render={props => <Scans />} />
      </div>
    </div>
  );
}

export default App;

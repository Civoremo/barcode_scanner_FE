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
      <h3>QR Code Scanner</h3>
      <br />
      <div
        style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
      >
        {/* <Link to='generateQR'>Generate QR</Link> */}
        <Link to='/orders' style={{ border: "1px solid red" }}>
          Orders
        </Link>
        <Link to='/shipping'>Shipping</Link>
        <Link to='/receiving'>Receiving</Link>
      </div>
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

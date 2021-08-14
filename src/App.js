/** @format */

import { Link, Route } from "react-router-dom";

import Shipping from "./components/shipping";
import Receiving from "./components/receiving";
import GenerateQRcode from "./components/generateQRcode";

function App() {
  return (
    <div>
      <h3>QR Code Scanner</h3>
      <br />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to='generateQR'>Generate QR</Link>
        <Link to='/shipping'>Shipping</Link>
        <Link to='/receiving'>Receiving</Link>
      </div>
      <div>
        <Route path='/generateQR' render={props => <GenerateQRcode />} />
        <Route path='/shipping' render={props => <Shipping />} />
        <Route path='/receiving' render={props => <Receiving />} />
      </div>
    </div>
  );
}

export default App;

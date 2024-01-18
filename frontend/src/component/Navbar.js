import { Link } from "react-router-dom";
import "../componentCss/navbar.css";
import React from "react";

function Navbar() {
  return (
    <div id="navbar">
      <Link to={"/"} className="logo">
        logo
      </Link>
      <div className="send-money-parent">
        <Link to={"/"} className="home">
          HOME
        </Link>
        <Link to={"/SearchUser"} className="send-money">
          ADD-MONEY
        </Link>
        <Link to={"/addmoney"} className="add-money">
          SEND-MONEY
        </Link>
        <Link to={"/Transections"} className="transection">
          TRANSECTIONS
        </Link>
      </div>
      <button className="logout">logout</button>
    </div>
  );
}

export default Navbar;

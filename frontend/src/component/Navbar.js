import { Link, useNavigate } from "react-router-dom";
import "../componentCss/navbar.css";
import React, { useContext } from "react";
import { UserContext } from "../App";

function Navbar() {
  const navicate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const renderLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    navicate("/login");
  };
  return (
    <div id="navbar" style={!state ? { display: "none" } : { display: "flex" }}>
      <Link to={"/"} className="logo">
        logo
      </Link>
      <div className="send-money-parent">
        <Link to={"/"} className="home">
          HOME
        </Link>
        <Link to={"/addmoney"} className="add-money">
          ADD-MONEY
        </Link>
        <Link to={"/SearchUser"} className="send-money">
          SEND-MONEY
        </Link>
        <Link to={"/Transections"} className="transection">
          TRANSECTIONS
        </Link>
      </div>
      <button className="logout" onClick={() => renderLogout()}>
        logout
      </button>
    </div>
  );
}

export default Navbar;

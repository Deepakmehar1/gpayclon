import React, {useContext ,useState} from "react";
import "../componentCss/login.css";
import { Link, useNavigate } from "react-router-dom";
import {UserContext} from "../App";

function Login() {
  const { state, dispatch } = useContext(UserContext);
  const navicate = useNavigate();
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");

  const PostData = () => {
    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNum,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          navicate(data.user.firstLogin?"/firstLogin":"/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login">
      <div className="left-content">
        <div className="bg" />
        <img className="left-content-child" alt="" src="/group-2.svg" />
        <div className="content">
          <div className="group-parent">
            <div className="nocash-parent">
              <b className="nocash">noCash</b>
              <div className="the-most-popular">
                The most popular tusted payment app
              </div>
            </div>
            <div className="read-more-wrapper ">
              <Link className="read-more ">Read More</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="right-content">
        <div className="title">
          <b className="nocash">Hello Again!</b>
          <div className="welcome-back-boss">Welcome Back Boss</div>
          <Link to={"/"} className="nocash forgot-password">
            Forgot Password
          </Link>
        </div>
        <div className="button">
          <div className="placeholder" onClick={() => PostData()}>
            <div className="nocash">Login</div>
          </div>
        </div>
        <div className="password">
          <div className="placeholder1">
            <div className="mobile-number">
              <input
                type="text"
                className="r-input"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <img
              className="bxbxs-lock-alt-icon"
              alt=""
              src="/bxbxslockalt.svg"
            />
          </div>
        </div>
        <div className="email">
          <div className="placeholder2">
            <div className="mobile-number">
              <input
                type="text"
                className="r-input"
                placeholder="mobile number"
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </div>
            <img
              className="bxbxs-lock-alt-icon"
              alt=""
              src="/codiconmail.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

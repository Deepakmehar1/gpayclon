import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../componentCss/register.css";

function Register() {
  const navicate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");

  const PostData = () => {
    fetch("http://localhost:5000/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phoneNum,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          console.log(data);
          navicate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="register">
      <div className="left-content">
        <div className="bg" />
        <div className="left-content-child"></div>
        <div
          className="left-content-child"
          style={{ top: "576px", left: "17px" }}
        ></div>
        {/* <img className="left-content-child" alt="" src="/group-2.svg" /> */}
        <div className="content">
          <div className="group-parent">
            <div className="nocash-parent">
              <b className="nocash">noCash</b>
              <div className="the-most-popular">
                The most popular tusted payment app
              </div>
            </div>
            <div className="read-more-wrapper">
              <div className="read-more">Read More</div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-content">
        <div className="title">
          <b className="hello-boss">Hello! Boss</b>
          <div className="sign-up-to">Sign Up to Get Started</div>
          <Link to={"/login"} className="nocash old-user">
            Already have an account? login
          </Link>
        </div>
        <div className="email-parent">
          <div className="email">
            <div className="placeholder">
              <div className="full-name">
                <input
                  type="text"
                  className="r-input"
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <img className="bxbxs-user-icon" alt="" src="/bxbxsuser.svg" />
            </div>
          </div>
          <div className="email">
            <div className="placeholder1">
              <div className="full-name">
                <input
                  type="text"
                  className="r-input"
                  placeholder="mobile number"
                  onChange={(e) => setPhoneNum(e.target.value)}
                />
              </div>
              <img className="codiconmail" alt="" src="/codiconmail.svg" />
            </div>
          </div>
          <div className="email">
            <div className="placeholder2">
              <div className="password1">
                <input
                  type="text"
                  className="r-input"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <img className="codiconmail" alt="" src="/bxbxslockalt.svg" />
            </div>
          </div>
          <div className="button" onClick={() => PostData()}>
            <div className="placeholder3">
              <div className="nocash">Register</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

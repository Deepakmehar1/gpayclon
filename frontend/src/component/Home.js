import React, { useContext, useState } from "react";
import "../componentCss/home.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
function Home() {
  const { state, dispatch } = useContext(UserContext);
  const [balence, setBalence] = useState("");

  const PostData = () => {
    fetch("http://localhost:5000/balence", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          setBalence(data.availableAmound);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="home" id="home">
      <div className="home-child">
        <img
          className="khan-sir-image-4-1-icon"
          alt="profile pic"
          src={state?state.pic:""}
        />

        {state ? <div className="first-last">{state.name}</div> : "loding.."}
      </div>
      <div className="home-item home-child">
        <img
          className="icons"
          alt=""
          src="/khansirimage4-1@2x.png"
          onClick={() => PostData()}
        />
        <p className="available-balence">available balence</p>
        <span style={{ marginTop: "-26px" }}>{balence}</span>
        {/* {balence ? (
        ) : (
          "loding.."
        )} */}
      </div>
      {console.log()}
      <div className="home-inner home-child">
        <Link to={"/addmoney"}>
          <img className="icons" alt="" src="/khansirimage4-1@2x.png" />
        </Link>
        <p className="add-money">add money</p>
      </div>
      <div className="ellipse-div home-child">
        <Link to={"/searchuser"}>
          <img className="icons" alt="" src="/khansirimage4-1@2x.png" />
        </Link>
        <p className="send-money">send money</p>
      </div>
      <div className="home-child1 home-child">
        <Link to={"/transections"}>
          <img className="icons" alt="" src="/khansirimage4-1@2x.png" />
        </Link>
        <p className="transections">transections</p>
      </div>
    </div>
  );
}

export default Home;

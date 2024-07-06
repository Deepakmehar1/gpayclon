import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../componentCss/sendmoney.css";
import { UserContext } from "../App";

function Sendmoney() {
  const { state, dispatch } = useContext(UserContext);
  const { userphoneNum } = useParams();
  const [amount, setAmount] = useState("");
  const [tpin, setTpin] = useState("");
  const [success, setTsuccess] = useState("");
  const [pic, setPic] = useState("");
  const [transection, setTransection] = useState("");
  useEffect(() => {
    fetch(`/user/${userphoneNum}/transections`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log("transectionssss", result);
        setTransection(result.transections);
        setPic(result.pic);
      });
  }, [success]);
  useEffect(() => {
    if (success !== "") {
      fetch(`/cashback`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ amount }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("cashbacck", result);
          if (result.cashback !== 0) {
            fetch("/addmoney", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
              body: JSON.stringify({
                amount: result.cashback,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data.message);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    }
  }, [success]);

  const PostData = () => {
    // console.log(amount,tpin,userphoneNum);
    fetch(`/user/${userphoneNum}/transfer`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        amount,
        tPin: tpin,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTsuccess(data.transection);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="send-money" id="send-money">
      <input
        className="send-money-item"
        type="text"
        placeholder="amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="send-money-inner" onClick={() => PostData} />
      <input
        className="send-money-child"
        type="text"
        placeholder="tPin"
        onChange={(e) => setTpin(e.target.value)}
      />
      <div className="div1">{userphoneNum}</div>
      <ul className="rectangle-div" key={"transection_container"}>
        {transection
          ? transection.map((item) => {
              return (
                <>
                  <li
                    key={item._id}
                    className={
                      item.sender == state.phoneNum ? "sender" : "recever"
                    }
                  >
                    <h6>transection no.-{item._id}</h6>
                    <h4>recever- {item.recever}</h4>
                    <h4>sender- {item.sender}</h4>
                    <h3>amount- {item.amount}</h3>
                  </li>
                </>
              );
            })
          : "no history"}
      </ul>
      <img src={pic} className="ellipse-div" />
    </div>
  );
}

export default Sendmoney;

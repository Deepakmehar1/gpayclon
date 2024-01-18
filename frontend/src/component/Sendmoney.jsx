import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../componentCss/sendmoney.css";

function Sendmoney() {
  const { userphoneNum } = useParams();
  const [amount, setAmount] = useState("");
  const [tpin, setTpin] = useState("");
  const [success, setTsuccess] = useState("");
  const [transection, setTransection] = useState("");
  useEffect(() => {
    fetch(`http://localhost:5000/user/${userphoneNum}/transections`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("transectionssss", result);
        setTransection(result.transections);
      });
  }, [success]);
  const PostData = () => {
    // console.log(amount,tpin,userphoneNum);
    fetch(`http://localhost:5000/user/${userphoneNum}/transfer`, {
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
        placeholder="77"
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="send-money-inner" onClick={() => PostData()} />
      <input
        className="send-money-child"
        type="text"
        placeholder="tPin"
        onChange={(e) => setTpin(e.target.value)}
      />
      <div className="div1">0000000000</div>
      <ul className="rectangle-div" key={"transection_container"}>
        {transection
          ? transection.map((item) => {
              return (
                <>
                  <li key={item._id}>{item._id}</li>
                </>
              );
            })
          : "no history"}
      </ul>
      <div className="ellipse-div" />
    </div>
  );
}

export default Sendmoney;

import { useState } from "react";
import "../componentCss/addmoney.css";
import { useNavigate } from "react-router-dom";

function Addmoney() {
  const navicate = useNavigate();
  const [amount, setAmount] = useState("");
  const [tpin, setTpin] = useState("");
  const PostData = () => {
    if (amount == "") {
      console.log("minimum amound is 1");
    } else if (amount == "0") {
      console.log("minimum amound is 1");
    } else {
      fetch("http://localhost:5000/addmoney", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          amount,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          navicate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="addmoney" id="addmoney">
      <div className="addmoney-inner" onClick={() => PostData()} />
      <div className="ellipse-div" />
      <div className="add-money">add money</div>
      <div className="add-money">add money</div>
      <input
        type="text"
        name="tpin"
        id="tpin"
        placeholder="tpin"
        className="tpin addmoney-item"
        onChange={(e) => setTpin(e.target.value)}
      />
      <input
        type="text"
        name="tpin"
        id="tpin"
        placeholder="00"
        className="div addmoney-child"
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  );
}

export default Addmoney;

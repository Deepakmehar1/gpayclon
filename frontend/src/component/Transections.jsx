import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import React from "react";
import "../componentCss/transection.css";

function Transections() {
  const { state, dispatch } = useContext(UserContext);
  const [transections, setTransections] = useState("");

  useEffect(() => {
    fetch(`/mytransection`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("transections", result);
        setTransections(result.transection);
      });
  }, []);
  return (
    <div className="transections" id="transections">
      <ul className="transections-child">
        {transections
          ? transections.map((item) => {
              return (
                <>
                  <li
                    key={item._id}
                    className={
                      item.sender == state.phoneNum ? "sender" : "recever"
                    }
                  >
                    <h6>transection no.-{item._id}</h6>
                    <h4>sender- {item.sender}</h4>
                    <h4>recever- {item.recever}</h4>
                    <h3>amount- {item.amount}</h3>
                  </li>
                </>
              );
            })
          : "no history"}
      </ul>
      <div className="transections1">transections</div>
      <div className="add-money">add money</div>
    </div>
  );
}

export default Transections;

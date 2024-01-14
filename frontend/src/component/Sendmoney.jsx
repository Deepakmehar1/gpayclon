import { useState } from "react";
import "../componentCss/sendmoney.css";

function Sendmoney() {
  const [rectangleInputValue, setRectangleInputValue] = useState("");
  return (
    <div className="send-money" id="send-money">
      <div className="send-money-child" />
      <input
        className="send-money-item"
        type="text"
        value={rectangleInputValue}
        onChange={(event) => setRectangleInputValue(event.target.value)}
      />
      <div className="send-money-inner" />
      <div className="tpin">tPin</div>
      <div className="div">00</div>
      <div className="div1">0000000000</div>
      <div className="rectangle-div" />
      <div className="ellipse-div" />
    </div>
  );
}

export default Sendmoney;

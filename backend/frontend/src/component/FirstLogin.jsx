import { useContext, useState, useEffect } from "react";
import "../componentCss/firstlogin.css";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function FirstLogin() {
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [amount, setAmount] = useState("");
  const navicate = useNavigate();

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

  const handlepic = async () => {
    const formData = new FormData();
    formData.append("image", image);
    if (amount == "") {
      console.log("minimum amound is 1");
    } else if (amount == "0") {
      console.log("minimum amound is 1");
    } else if (!image) {
      console.log("please add all fields", "error");
    } else {
      await fetch("http://localhost:5000/addmoney", {
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
        })
        .catch((err) => {
          console.log(err);
        });

      await fetch("http://localhost:5000/picfile", {
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            console.log(data.error, "error");
          } else {
            console.log(data, "success");
            navicate("/");
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...state,
                pic: data.pic,
                firstLogin: data.firstLogin,
              })
            );
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
    // eslint-disable-next-line
  };
  return (
    <div className="addmoney" id="FirstLogin">
      {/* {state && !state.firstLogin?navicate("/"):""} */}
      <div className="uploadPic">upload pic</div>
      <div className="container">
        <div className="ellipse-div">
          <img
            src={image ? URL.createObjectURL(image) : ""}
            alt="preview screen"
            className="preview"
          />
        </div>
        <input
          type="file"
          name="uploadimg"
          id="uploadimg"
          className="uploadimg"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <div className="add-money">add money</div>
      <div className="container2">
        <div className="addmoney-inner" onClick={() => handlepic()} />
        <input
          type="text"
          name="tpin"
          id="tpin"
          placeholder="00"
          className="div addmoney-child"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
    </div>
  );
}

export default FirstLogin;

import "../componentCss/searchuser.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Searchuser() {
  const [phoneNum, setPhonenum] = useState("");
  const [user, setUser] = useState("");
  const PostData = () => {
    fetch("/search-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        phoneNum,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          console.log(data.user);
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="searchuser" id="searchuser">
      <input
        type="text"
        name="phone_number"
        id="phone_number"
        placeholder="phone number"
        className="searchuser-child phone_number"
        onChange={(e) => setPhonenum(e.target.value)}
      />

      <div
        className="searchuser-item"
        onClick={() => {
          PostData();
        }}
      />
      <div className="searchuser-inner">
        {user
          ? user.map((item) => {
              return (
                <>
                  {/* /user/:_id/transfer */}
                  <p key={item._id}>
                    <Link to={"/user/" + item.phoneNum + "/transfer"}>
                      {!item == ""
                        ? item.phoneNum + "- " + item.name
                        : "not exist"}
                    </Link>
                  </p>
                  <hr />
                </>
              );
            })
          : "nohistory"}
      </div>
      <div className="send-money">search user</div>
    </div>
  );
}

export default Searchuser;

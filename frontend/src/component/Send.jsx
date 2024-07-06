import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Send() {
  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo("/");
  }, []);
  return <div>hello</div>;
}

export default Send;

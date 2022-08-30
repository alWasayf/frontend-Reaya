import "../styles/Verify.css";
import React from "react";

const Verify = () => {
  return (
    <div className="verify">
      <div className="verify__box">
        <p>Please verify your account by entering the numbers you reserved.</p>
        <input type="text" placeholder="verify your account" />
        <button>Verify</button>
      </div>
    </div>
  );
};

export default Verify;

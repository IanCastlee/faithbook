import { useState } from "react";
import "./notic.scss";

const NotifDrop = ({ setNotifBox }) => {
  return (
    <>
      <div className="n-wrapper" onClick={() => setNotifBox(false)}>
        <span>Hello</span>
        <span>Hello</span>
        <span>Hello</span>
      </div>
    </>
  );
};

export default NotifDrop;

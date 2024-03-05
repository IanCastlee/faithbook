import { useState } from "react";
import "./notic.scss";

const NotifDrop = () => {
  const [showMessageBox] = useState(true);
  return (
    <>
      <div className="n-wrapper" onClick={showMessageBox}>
        <span>Hello</span>
        <span>Hello</span>
        <span>Hello</span>
      </div>
    </>
  );
};

export default NotifDrop;

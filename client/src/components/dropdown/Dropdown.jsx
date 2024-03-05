import { useContext, useState } from "react";
import "./dropdown.scss";

import { IoMoon } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";

const Dropdown = () => {
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(!close);
  };

  return (
    <div className={`d-wrapper ${close ? "closed" : ""}`} onClick={handleClose}>
      Message Box
    </div>
  );
};

export default Dropdown;

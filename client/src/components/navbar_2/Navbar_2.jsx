import { NavLink } from "react-router-dom";
import "./navbar_2.scss";

import { TbSquareLetterT } from "react-icons/tb";
import { PiUsers } from "react-icons/pi";
import { PiChurchDuotone } from "react-icons/pi";
import { HiOutlineHome } from "react-icons/hi2";

const Navbar_2 = ({ closeAll }) => {
  return (
    <div className="nav_2">
      <NavLink to="/" onClick={closeAll} style={{ textDecoration: "none" }}>
        <span className="icon-wrapper">
          <HiOutlineHome className="img" />
        </span>
      </NavLink>

      <span className="icon-wrapper">
        <TbSquareLetterT className="img" />
      </span>

      <NavLink to="door/friend" style={{ textDecoration: "none" }}>
        <span className="icon-wrapper">
          <PiUsers className="img" />
        </span>
      </NavLink>

      <span className="icon-wrapper">
        <PiChurchDuotone className="img" />
      </span>
    </div>
  );
};

export default Navbar_2;

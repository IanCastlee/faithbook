import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";

import Dropdown from "../dropdown/Dropdown";
import UserDropdown from "../dropdown/UserDropdown";

//  R E A C T   I C O N S
import { RiCrossFill } from "react-icons/ri";

/////

import { LiaSearchSolid } from "react-icons/lia";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import NotifDrop from "../dropdown/NotifDrop";
import Navbar_2 from "../navbar_2/Navbar_2";

const Navar = () => {
  const { currentUser } = useContext(AuthContext);

  const [showUsersetting, setUserSetting] = useState(false);
  const [showMessageBox, setMessageBox] = useState(false);
  const [showNotifBox, setNotifBox] = useState(false);

  const handleMsg = () => {
    setMessageBox(!showMessageBox);
    setNotifBox(false);
  };
  const handleNoti = () => {
    setNotifBox(!showNotifBox);
    setMessageBox(false);
  };

  const closeAll = () => {
    setMessageBox(false);
    setNotifBox(false);
  };

  const handleProfile = () => {
    setUserSetting(!showUsersetting);
  };
  return (
    <>
      <div className="navbar">
        <div className="nav-left">
          <Link to="/" onClick={closeAll} style={{ textDecoration: "none" }}>
            <span className="logo">Sheep</span>
          </Link>

          {/* <div className="nav-friend-wrapper" onClick={handleFrnd}>
            <NavLink style={{ textDecoration: "none" }} to="door/friend">
              {" "}
              <img
                src="../assets/friends (1).png"
                alt=""
                className="nav_iconn1"
              />
            </NavLink>
          </div> */}
        </div>

        <div className="nav-center"></div>

        <div className="nav-right">
          <div className="search-wrapper">
            <input type="text" placeholder="Search..." />
            <LiaSearchSolid className="searcIcon" />
          </div>

          <>
            <div
              className={`nav-mail-wrapper ${showMessageBox ? "activee" : ""}`}
              onClick={handleMsg}
            >
              <img src="../assets/mail.png" alt="" className="nav_iconn" />
              <span className="dot_1">4</span>
            </div>
            {showMessageBox && <Dropdown setMessageBox={setMessageBox} />}
          </>

          <>
            <div
              className={`nav-bell-wrapper ${showNotifBox ? "activee" : ""}`}
              onClick={handleNoti}
            >
              <img src="../assets/bell.png" alt="" className="nav_iconn" />
              <span className="dot_2">2</span>
            </div>
            {showNotifBox && <NotifDrop setNotifBox={setNotifBox} />}
          </>

          <>
            <div className="nav_current_user" onClick={handleProfile}>
              <img
                src={
                  currentUser.profilePic === ""
                    ? "../assets/cvp.jpg"
                    : "../upload/" + currentUser.profilePic
                }
                alt=""
              />
              <span className={`nav_user ${showUsersetting ? "activee" : ""}`}>
                {currentUser.name.split(" ")[0]}
              </span>
            </div>

            {showUsersetting && <UserDropdown />}
          </>
        </div>
      </div>
    </>
  );
};

export default Navar;

import { Link, useNavigate } from "react-router-dom";
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

const Navar = () => {
  const { currentUser } = useContext(AuthContext);

  const [showMessageBox, setMessageBox] = useState(false);
  const [showNotifBox, setNotifBox] = useState(false);
  const [usersetting, setUserSetting] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="nav-left">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">
              <img
                src="../assets/connect.png"
                style={{ height: "40px", width: "40px", borderRadius: "10px" }}
                alt=""
              />
              <div className="wrd">
                𝙲𝚘𝚗𝚗𝚎𝚌
                <RiCrossFill
                  style={{
                    fontSize: "35px",
                    marginLeft: "-10px",
                    marginRight: "-10px",
                    marginBottom: "10px",
                    color: "blue",
                  }}
                />
                𝚎𝚍
              </div>
            </span>
          </Link>
        </div>

        <div className="nav-center"></div>

        <div className="nav-right">
          <div className="search-wrapper">
            <input type="text" placeholder="Search..." />
            <LiaSearchSolid className="searcIcon" />
          </div>
          <div className="nav-friend-wrapper">
            <Link style={{ textDecoration: "none" }} to="door/friend">
              {" "}
              <img
                src="../assets/friends (1).png"
                alt=""
                className="nav_iconn1"
              />
            </Link>
            {/* <span className="dot_1">1</span> */}
          </div>

          <>
            <div
              className="nav-mail-wrapper"
              onClick={() => {
                setMessageBox(!showMessageBox);
                setUserSetting(false);
                setNotifBox(false);
              }}
            >
              <img src="../assets/mail.png" alt="" className="nav_iconn" />
              <span className="dot_1">4</span>
            </div>
            {showMessageBox && <Dropdown />}
          </>

          <>
            <div
              className="nav-bell-wrapper"
              onClick={() => {
                setNotifBox(!showNotifBox);
                setUserSetting(false);
                setMessageBox(false);
              }}
            >
              <img src="../assets/bell.png" alt="" className="nav_iconn" />
              <span className="dot_2">2</span>
            </div>
            {showNotifBox && <NotifDrop />}
          </>

          <>
            <div
              className="nav_current_user"
              onClick={() => {
                setUserSetting(!usersetting);
                setMessageBox(false);
              }}
            >
              <img
                src={
                  currentUser.profilePic === ""
                    ? "../assets/cvp.jpg"
                    : "../upload/" + currentUser.profilePic
                }
                alt=""
              />
              <span className="nav_user">{currentUser.name.split(" ")[0]}</span>
            </div>
            {usersetting && <UserDropdown />}
          </>
        </div>
      </div>
    </>
  );
};

export default Navar;

import { useContext, useState } from "react";
import "./userdropdown.scss";

import { IoMoon } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";

import { DarkModeContext } from "../../context/DarkModeContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const UserDropdown = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = () => {
    alert("Are you sure you want to logout?");
    window.localStorage.removeItem("mangagamit");
    navigate("/login");
  };
  return (
    <div className="userSetting">
      <div className="userConatainer">
        <Link
          style={{ textDecoration: "none" }}
          to={`/profile/${currentUser.id}`}
        >
          <span className="setting">
            <FaUser className="settingIcon" />
            Profile
          </span>
        </Link>
        <span className="setting">
          <IoMdSettings className="settingIcon" />
          Setting
        </span>

        <div className="wrapper-s">
          {darkMode ? (
            <span className="light" onClick={toggle}>
              {" "}
              <MdWbSunny className="s" />
              Light
            </span>
          ) : (
            <span className="dark" onClick={toggle}>
              <IoMoon className="m" />
              Dark
            </span>
          )}
        </div>

        <div className="logout" onClick={logout}>
          <IoLogOut className="lg" />
          Logout{" "}
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;

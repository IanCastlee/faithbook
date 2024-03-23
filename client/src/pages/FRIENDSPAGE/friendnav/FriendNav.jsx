import { Link, NavLink } from "react-router-dom";
import "./friendnav.scss";
import { useState } from "react";

const FriendNav = () => {
  return (
    <div className="fnav">
      <ul className="list">
        <NavLink style={{ textDecoration: "none" }} to="friend">
          {" "}
          <li className="item">Friend</li>
        </NavLink>

        <NavLink style={{ textDecoration: "none" }} to="suggested">
          <li className="item">Discover</li>
        </NavLink>

        <NavLink style={{ textDecoration: "none" }} to="friendreq">
          <li className="item">Knocking</li>
        </NavLink>

        <NavLink style={{ textDecoration: "none" }} to="following">
          <li className="item">Following</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default FriendNav;

import { Link } from "react-router-dom";
import "./friendnav.scss";
import { useState } from "react";

const FriendNav = () => {
  const [actv_frnd, set_act_frnd] = useState(true);
  const [actv_dis, set_act_dic] = useState(false);
  const [actv_knocking, set_act_knocking] = useState(false);
  const [actv_foll, set_act_foll] = useState(false);

  const handleActFrnd = () => {
    set_act_frnd(!actv_frnd);
    set_act_dic(false);
    set_act_knocking(false);
    set_act_foll(false);
  };
  const handleActDic = () => {
    set_act_dic(!actv_dis);
    set_act_frnd(false);
    set_act_knocking(false);
    set_act_foll(false);
  };
  const handleActKnock = () => {
    set_act_knocking(!actv_knocking);
    set_act_frnd(false);
    set_act_dic(false);
    set_act_foll(false);
  };
  const handleActFoll = () => {
    set_act_foll(!actv_foll);
    set_act_frnd(false);
    set_act_dic(false);
    set_act_knocking(false);
  };

  return (
    <div className="fnav">
      <ul className="list">
        <Link style={{ textDecoration: "none" }} to="friend">
          {" "}
          <li
            className={`item ${actv_frnd ? "active" : ""}`}
            onClick={handleActFrnd}
          >
            Friend
          </li>
        </Link>

        <Link style={{ textDecoration: "none" }} to="suggested">
          <li
            className={`item ${actv_dis ? "active" : ""}`}
            onClick={handleActDic}
          >
            Discover
          </li>
        </Link>

        <Link style={{ textDecoration: "none" }} to="friendreq">
          <li
            className={`item ${actv_knocking ? "active" : ""}`}
            onClick={handleActKnock}
          >
            Knocking
          </li>
        </Link>

        <Link style={{ textDecoration: "none" }} to="friendreq">
          <li
            className={`item ${actv_foll ? "active" : ""}`}
            onClick={handleActFoll}
          >
            Following
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default FriendNav;

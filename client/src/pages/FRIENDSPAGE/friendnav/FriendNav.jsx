import { Link } from "react-router-dom";
import "./friendnav.scss";

const FriendNav = () => {
  return (
    <div className="fnav">
      <ul className="list">
        <Link style={{ textDecoration: "none" }} to="friend">
          {" "}
          <li className="item">Friend</li>
        </Link>

        <Link style={{ textDecoration: "none" }} to="suggested">
          <li className="item">Discover</li>
        </Link>

        <Link style={{ textDecoration: "none" }} to="friendreq">
          <li className="item">Knocking</li>
        </Link>
      </ul>
    </div>
  );
};

export default FriendNav;

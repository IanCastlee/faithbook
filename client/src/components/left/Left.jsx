import { useContext, useEffect } from "react";
import "./left.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useQueryClient } from "@tanstack/react-query";

const Left = () => {
  const { currentUser } = useContext(AuthContext);

  // const queryClient = useQueryClient();
  console.log(currentUser);
  return (
    <div className="leftbar">
      <div className="left-container">
        <div className="left-top-wrapper">
          <div className="profile-events">
            <Link
              style={{ textDecoration: "none" }}
              to={`/profile/${currentUser.id}`}
              state={{ Data: currentUser }}
            >
              <div className="profile-name">
                <img
                  src={
                    currentUser.profilePic === ""
                      ? "../assets/cvp.jpg"
                      : "../upload/" + currentUser.profilePic
                  }
                  alt=""
                  className="profile-img"
                />
                <span className="l-name">{currentUser.name}</span>
              </div>
            </Link>

            <div className="l-eventwrapper">
              <p className="notif">4 Unread Message</p>
            </div>
          </div>

          <hr className="hrt" />

          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="list">
              <img src="../assets/home-sweet-home.png" alt="" />
              <span className="item">Home</span>
            </div>
          </Link>

          <Link to="/testimony" style={{ textDecoration: "none" }}>
            <div className="list">
              <img src="../assets/testimonials.png" alt="" />
              <span className="item">Testimonies</span>
            </div>
          </Link>

          <Link to="door/friend" style={{ textDecoration: "none" }}>
            <div className="list">
              <img src="../assets/friends (1).png" alt="" />
              <span className="item">Friends</span>
            </div>
          </Link>

          <div className="list">
            <img src="../assets/event (1).png" alt="" />
            <span className="item">Event</span>
          </div>

          <div className="list">
            <img src="../assets/church.png" alt="" />
            <span className="item">Church</span>
          </div>

          <div className="list">
            <img src="../assets/group-of-people.png" alt="" />
            <span className="item">Group</span>
          </div>
        </div>

        <hr className="hr" />

        <div className="left-bottom-wrapper">
          <span className="title">Pages</span>
          <div className="list">
            <img src="../assets/v5.jpg" alt="" />
            <span className="item">
              Bachelor of Science in Information Technology
            </span>
          </div>

          <div className="list">
            <img src="../assets/v5.jpg" alt="" />
            <span className="item">
              Bachelor of Science in Information Technology
            </span>
          </div>

          <div className="list">
            <img src="../assets/v5.jpg" alt="" />
            <span className="item">
              Bachelor of Science in Information Technology
            </span>
          </div>

          <div className="list">
            <img src="../assets/v5.jpg" alt="" />
            <span className="item">
              Bachelor of Science in Information Technology
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;

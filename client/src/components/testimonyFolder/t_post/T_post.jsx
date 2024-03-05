import "./t_post.scss";

import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import { RiMore2Line } from "react-icons/ri";
const t_post = () => {
  return (
    <div className="post">
      <div className="post-container">
        <div className="post-wrapper">
          <div className="post-top">
            <img src={post.postImg} alt="" className="post-img" />
          </div>
          <div className="post-center">
            <p className="post-desc">
              <strong>-</strong>
              {post.desc}
            </p>
          </div>
          <div className="post-bottom">
            <div className="post-bottom-left">
              <img src={post.profilePic} alt="" className="posted-by-userimg" />
              <div className="post-info">
                <span className="name">{post.user}</span>
                <p className="date">3 mins ago</p>
              </div>
            </div>

            <div className="post-bottom-right">
              <div className="action">
                <FaRegHeart className="icon" />
                <p className="count">12k</p>
              </div>

              <div
                className="action"
                onClick={() => setopenComment(!openComment)}
              >
                <FaRegComment className="icon" />
                <p className="count">12k</p>
              </div>

              {/* <div className="action">
                <PiShareFatBold className="icon" />
                <p className="count">12k</p>
              </div> */}

              <div className="action">
                <RiMore2Line className="icon" />
              </div>
            </div>
          </div>

          {/* {openComment && <Comment />} */}
        </div>
      </div>
    </div>
  );
};

export default t_post;

import "./post.scss";

import { MdDelete } from "react-icons/md";
import { MdReport } from "react-icons/md";

import Comment from "../comment/Comment";
import { useContext, useState } from "react";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [openComment, setopenComment] = useState(false);
  const [openMenu, setMenu] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const {
    isPending: isPendingLike,
    error: errorLike,
    data: dataLike,
  } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => {
        return res.data;
      }),
  });

  //////////// LIKE UNLIKED /////////////////

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      // Invalidate and refetch only the comments for the specific post
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  const handleClick = () => {
    mutation.mutate(dataLike.includes(currentUser.id));
  };

  //////////// COMMENT GET LENGTH ////////////////

  const queryKey = ["comments", post.id]; // Unique query key for each post
  const {
    isPending,
    error,
    data: comments,
  } = useQuery({
    queryKey,
    queryFn: () =>
      makeRequest.get("/comments?postId=" + post.id).then((res) => res.data),
  });

  const commentCount = comments ? comments.length : 0;

  ////////////// DELETE POST /////////////////

  const mutationDel = useMutation({
    mutationFn: (postId) => makeRequest.delete("/posts/" + postId),
    onSuccess: () => {
      // Invalidate and refetch only the comments for the specific post
      queryClient.invalidateQueries(queryKey);
    },
  });

  const handleDel = () => {
    mutationDel.mutate(post.id);
  };

  return (
    <div
      onClick={openMenu ? () => setMenu(!openMenu) : () => {}}
      className="post"
    >
      <div className="post-container">
        <div className="post-wrapper">
          <div className="post-top">
            <Link to={`/post/${post.id}`} state={{ Postt: post }}>
              <img src={"../upload/" + post.img} alt="" className="post-img" />
            </Link>
          </div>
          <div className="post-center">
            <p className="post-desc">{post.descr}</p>
          </div>

          <div className="hr-wrapper">
            <hr className="hr" />
          </div>

          <div className="post-bottom">
            <div className="post-bottom-left">
              <img
                src={
                  post.profilePic === ""
                    ? "../assets/cvp.jpg"
                    : "../upload/" + post.profilePic
                }
                alt=""
                className="posted-by-userimg"
              />
              <div className="post-info">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/profile/${post.userId}`}
                >
                  <span className="name">{post.name}</span>
                </Link>
                <p className="date">{moment(post.createdAt).fromNow()}</p>
              </div>
            </div>

            <div className="post-bottom-right">
              <div className="action1">
                {isPendingLike ? (
                  "loading"
                ) : dataLike.includes(currentUser.id) ? (
                  <img
                    src="../assets/heart (2).png"
                    className="icon"
                    alt=""
                    onClick={handleClick}
                  />
                ) : (
                  <img
                    src="../assets/heart (4).png"
                    className="icon"
                    alt=""
                    onClick={handleClick}
                  />
                )}
                {dataLike && dataLike.length <= 0 ? (
                  ""
                ) : (
                  <span className="count">{dataLike && dataLike.length}</span>
                )}
              </div>

              <div
                className="action2"
                onClick={() => setopenComment(!openComment)}
              >
                <img
                  src="../assets/speech-bubble.png"
                  className="icon"
                  alt=""
                />
                {commentCount === 0 ? (
                  ""
                ) : (
                  <p className="count">{commentCount}</p>
                )}
              </div>

              <div className="action3">
                <img
                  src="../assets/more (1).png"
                  style={{
                    height: " 16px",
                    width: "16px",
                    cursor: "pointer",
                  }}
                  alt=""
                  onClick={() => setMenu(!openMenu)}
                />
                {openMenu && (
                  <div className="menuWrapper">
                    {openMenu && post.userId === currentUser.id && (
                      <button onClick={handleDel}>
                        <MdDelete style={{ color: "red" }} /> Delete post
                      </button>
                    )}

                    <button>
                      <MdReport style={{ color: "red" }} />
                      Report post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {openComment && <Comment postId={post.id} />}
        </div>
      </div>
    </div>
  );
};

export default Post;

/* <p className="pp">
{dataLike.length === 1 &&
dataLike.includes(currentUser.id) ? (
  ""
) : (
  <>
    {dataLike.includes(currentUser.id) ? (
      <>
        You and {dataLike.length - 1}{" "}
        {dataLike.length === 2 ? "other" : "others"} loved
        this
      </>
    ) : (
      <>
        {dataLike.length}{" "}
        {dataLike.length === 1 ? "person" : "people"}{" "}
        loved this
      </>
    )}
  </>
)}
</p>
) : (
<p className="reaction"> Be the first to love this</p>
)} */

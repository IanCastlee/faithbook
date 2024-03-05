import { useContext, useState } from "react";
import "./comment.scss";
import { LuSendHorizonal } from "react-icons/lu";
import { AuthContext } from "../../context/authContext";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

import { invalidWords } from "../invalidWords.js";
import Post from "../post/Post.jsx";
import { Link } from "react-router-dom";

const Comment = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [err, setErr] = useState(null);
  const [show_3, Showmore] = useState(true);

  const queryKey = ["comments", postId]; // Unique query key for each post
  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => makeRequest.post("/comments", newComment),
    onSuccess: () => {
      // Invalidate and refetch only the comments for the specific post
      queryClient.invalidateQueries(queryKey);
    },
  });

  // const containsForbiddenWords = (comment) => {
  //   const lowerCaseComment = comment.toLowerCase();
  //   return invalidWords.some((word) => lowerCaseComment.includes(word));
  // };

  const containsForbiddenWords = (comment) => {
    const lowerCaseComment = comment.toLowerCase();
    const forbiddenWords = invalidWords.filter((word) =>
      lowerCaseComment.includes(word)
    );

    return forbiddenWords.length > 0 ? forbiddenWords : null;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const forbiddenWords = containsForbiddenWords(desc);

    if (forbiddenWords) {
      const forbiddenWordsString = forbiddenWords.join(", ");
      return setErr(
        `Your comment contains inappropriate ${
          forbiddenWords.length === 1 ? "word" : "words"
        } (${forbiddenWords
          .map((word) => `"${word}"`)
          .join(", ")}). Please revise your comment.`
      );
    }

    mutation.mutate({ desc, postId });
    setDesc("");
    setErr("");
  };

  const commentsToShow = show_3 ? data.slice(0, 3) : data;

  return (
    <div className="comment">
      <hr className="hr" />
      <span
        style={{
          fontSize: "15px",
          fontWeight: "700",
          color: "gray",
        }}
      >
        {data.length === 1
          ? "Comment"
          : data.length > 1
          ? "Comments"
          : "No comments yet"}
      </span>

      <div className="comment-container">
        <div className="comment-top-wrapper">
          {error
            ? "Something went wrong"
            : isPending
            ? "loading..."
            : commentsToShow.map((comment) => (
                <div className="comment-top" key={comment.id}>
                  <div className="comment_wrapper">
                    <div className="comment-name-wrapper">
                      <img
                        src={
                          comment.profilePic === ""
                            ? "../assets/cvp.jpg"
                            : "../upload/" + comment.profilePic
                        }
                        alt=""
                        className="user-img-com"
                      />
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/profile/${comment.userId}`}
                      >
                        {" "}
                        <span className="comment-name">{comment.name}</span>
                      </Link>
                    </div>
                    <p className="comment-desc">{comment.descr}</p>
                  </div>
                  <p className="comment_date">
                    {moment(comment.createdAt).fromNow()}
                  </p>
                </div>
              ))}
        </div>
        {/* {error
          ? "Something went wrong"
          : isPending
          ? "loading..."
          : (() => {
              const commentsToShow = showmore ? data.slice(0, 3) : data;
              return commentsToShow.map((comment) => (
                <div className="comment-top" key={comment.id}>
                  <div className="comment_wrapper">
                    <span className="comment-name">{comment.name}</span>
                    <p className="comment-desc">{comment.descr}</p>
                  </div>
                  <p className="comment_date">
                    {moment(comment.createdAt).fromNow()}
                  </p>
                </div>
              ));
            })()} */}

        <span className="btn-showmore" onClick={() => Showmore(!show_3)}>
          {data.length <= 3
            ? ""
            : show_3
            ? "Show more comments..."
            : "Show less comments..."}
        </span>

        <div className="comment-bottom-wrapper">
          <span style={{ fontSize: "12px", color: "red" }}> {err && err}</span>
          <div className="comment-bottom">
            <div className="write-comment-wrapper">
              <img
                src={
                  currentUser.profilePic === ""
                    ? "../assets/cvp.jpg"
                    : "../upload/" + currentUser.profilePic
                }
                alt=""
                className="comment-curren-user"
              />

              <input
                type="text"
                placeholder="Write your comment"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </div>

            {/* <span className="btn-send" onClick={handleClick}> */}
            <img
              src="../assets/delivery.png"
              className="btn-send"
              alt=""
              onClick={handleClick}
            />
            {/* </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;

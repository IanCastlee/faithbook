import React, { useEffect, useState } from "react";
import Post from "../post/Post";

import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

const Posts = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest
        .get("/posts")
        .then((res) => {
          // Check if the response status is 401
          if (res.status === 401 || (res.data && res.data.status === 401)) {
            // Clear local storage if status is 401
            window.localStorage.removeItem("mangagamit");
          }

          return res.data;
        })
        .catch((error) => {
          // Check if the error status is 401
          if (error.response && error.response.status === 401) {
            // Clear local storage if status is 401
            alert("Token is exppired login again");
            //window.localStorage.clear();
            window.localStorage.removeItem("mangagamit");
            navigate("/login");
          }

          throw error; // Rethrow the error to be caught by the `error` variable
        }),
  });

  return (
    <div className="posts">
      {error ? (
        "Something went wrong!"
      ) : isPending ? (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "70px",
          }}
        >
          {" "}
          <ClipLoader
            color={`#B4B4B8`}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </span>
      ) : (
        data.map((post) => <Post post={post} key={post.id} allPost={data} />)
      )}
    </div>
  );
};

export default Posts;

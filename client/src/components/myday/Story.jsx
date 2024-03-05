import React, { useContext, useRef, useState } from "react";
import "./story.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import StoryInput from "../dropdown/StoryInput";
import { Link } from "react-router-dom";

///
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
import moment from "moment";

const Story = () => {
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const { currentUser } = useContext(AuthContext);

  const [showVerse, setVerse] = useState(false);

  const {
    isPending,
    error,
    data: storyData,
  } = useQuery({
    queryKey: ["story"],
    queryFn: () =>
      makeRequest.get("/stories").then((res) => {
        return res.data;
      }),
  });

  const scrollForward = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 100;
    }
  };

  const scrollBackward = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 100;
    }
  };

  return (
    <div className="stories-container " ref={containerRef}>
      <>
        <div className="bckwrd" onClick={scrollBackward}>
          <IoIosArrowBack />
        </div>
        <div className="stories-wrapper">
          <>
            <div className="story-wrapper1">
              <div className="bgimg">
                <img
                  src={
                    currentUser.profilePic === ""
                      ? "../assets/cvp.jpg"
                      : "../upload/" + currentUser.profilePic
                  }
                  alt=""
                  className="imgP"
                />
              </div>
              <span
                className="name_poster"
                onClick={() => setVerse(!showVerse)}
              >
                Add Verse
              </span>
            </div>

            {showVerse && <StoryInput />}
          </>

          {error ? (
            "Someting went wrong"
          ) : isPending ? (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "50px",
              }}
            >
              {" "}
              <ClipLoader
                color={`#525CEB`}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </span>
          ) : (
            storyData &&
            storyData.map((story) => (
              <React.Fragment key={story.id}>
                <div className="story-wrapper" key={story.id}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/user_story/${story.id}`}
                    // state={{ storyData: storyData, clickStory: story }}
                  >
                    <div className="bgimg">
                      <img
                        src={
                          story.coverPic === ""
                            ? "../assets/orgcpp.png"
                            : "../upload/" + story.coverPic
                        }
                        alt=""
                        className="coverPic"
                      />
                      <p className="descc">{story.verse}</p>
                      <p style={{ display: "none" }}>
                        {moment(story.createdAt).fromNow()}
                      </p>
                    </div>
                  </Link>
                  <span className="name_poster">
                    {story.name.split(" ")[0]}
                  </span>
                </div>
              </React.Fragment>
            ))
          )}
        </div>

        <div className="frwrd" onClick={scrollForward}>
          <IoIosArrowForward />
        </div>
      </>
    </div>
  );
};

export default Story;

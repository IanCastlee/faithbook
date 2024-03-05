import Story from "../../components/myday/Story";
import Posts from "../../components/posts/Posts";
import Share from "../../components/sharee/Share";
import "./home.scss";
import Post from "../../components/post/Post";
import { useState } from "react";
import StoryInput from "../../components/dropdown/StoryInput";

const Home = () => {
  return (
    <div className="homee">
      <Story />
      <div className="main-home">
        <Share />
        <div className="title-wrapper">
          <p className="pl"></p>
          <span className="title2">Feed</span>
          <p className="pr"></p>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Home;

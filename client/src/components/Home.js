import React, { Fragment } from "react";
import Posts from "../components/post/Posts";
import SuggestUsers from "./SuggestUsers";

const Home = () => {
  return (
    <div className="container">
      <div className="home-items ">
        <Posts />
        <SuggestUsers />
      </div>
    </div>
  );
};

export default Home;

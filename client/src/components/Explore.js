import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import Comment from "./Comment";
import { connect } from "react-redux";
import {
  getPosts,
  //   deletePost,
  //   deleteComment,
  //   likePost,
  //   unLikePost,
  //   getFeed,
} from "../actions/postActions";
import { Link } from "react-router-dom";
// import classnames from "classnames";

const Explore = ({
  post: { posts, user, error, loading },
  auth,
  getPosts,
  //   likePost,
  //   unLikePost,
  //   deletePost,
  //   deleteComment,
  //   getFeed,
}) => {
  useEffect(() => {
    getPosts();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  } else if (!posts) {
    return (
      <h3 className="text-center mt-5">
        No posts found <br /> follow users to show their posts{" "}
      </h3>
    );
  }

  //   // Check if user liked the post or not
  //   const findLike = (likes) => {
  //     if (likes.filter((like) => like.user === auth.user._id).length > 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };

  //   const onLike = (id) => {
  //     // setShowLike(true);
  //     likePost(id);
  //   };

  //   const onUnLike = (id) => {
  //     // setShowLike(false);
  //     unLikePost(id);
  //   };

  return (
    <div className="container">
      <div className="row">
        {posts.map((postItem) => (
          <div className="col-md-4 post-profile" key={postItem._id}>
            <img src={postItem.photo && `/uploads/${postItem.photo}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

Explore.propTypes = {
  getPosts: PropTypes.func.isRequired,
  //   getFeed: PropTypes.func.isRequired,
  //   deletePost: PropTypes.func.isRequired,
  //   likePost: PropTypes.func.isRequired,
  //   unLikePost: PropTypes.func.isRequired,
  //   deleteComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPosts,
  //   getFeed,
  //   deletePost,
  //   likePost,
  //   unLikePost,
  //   deleteComment,
})(Explore);

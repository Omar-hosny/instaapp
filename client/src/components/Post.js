import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, getPost, deletePost } from "../actions/postActions";
import { Link } from "react-router-dom";
import classnames from "classnames";

const Post = ({
  post: { posts, user, error, loading },
  auth,
  getPosts,
  deletePost,
}) => {
  useEffect(() => {
    getPosts();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  } else if (posts === null) {
    return <h1 className="text-center mt-5">No posts to show!</h1>;
  }

  // Check if user liked the post or not
  const findLike = (likes) => {
    if (likes.filter((like) => like.user === auth.user._id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container">
      {posts.map((postItem) => (
        <div className="row" key={postItem._id}>
          <div className="post-item mx-auto mt-5" key={postItem._id}>
            <div className="card">
              <div className="card-header">
                <img
                  src={`/uploads/avatar/${postItem.user.avatar}`}
                  className="post-header-img"
                  alt=""
                />
                <Link to={`/profile/${postItem.userId}`} className="mt-2 ">
                  <h5 className="card-title">{postItem.user.name}</h5>
                </Link>
                {auth.user._id === postItem.userId ? (
                  <div className="dropdown ml-auto actions">
                    <i
                      className="fas fa-angle-down "
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    ></i>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link
                        className="dropdown-item"
                        to={`/edit-post/${postItem._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="dropdown-item"
                        onClick={() => deletePost(postItem._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="post-body">
                <img
                  src={`/uploads/${postItem.photo}`}
                  alt=""
                  className="post-photo"
                />
                <div className="card-footer postItem-caption">
                  <h6 className="card-title">{postItem.user.name}</h6>
                  <h5 className="">{postItem.caption}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts, deletePost })(Post);

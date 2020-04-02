import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, getPost, deletePost } from "../actions/postActions";
import { Link } from "react-router-dom";

const Post = ({
  post: { posts, user, loading },
  auth,
  getPosts,
  deletePost
}) => {
  useEffect(() => {
    getPosts();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  } else if (posts === null) {
    return <h1 className="text-center">No posts to show!</h1>;
  }

  return (
    <div className="container">
      <div className="row">
        {posts &&
          posts.map(post => (
            <div key={post._id} className="post mx-auto mt-5 mb-5">
              <div className="header">
                <div className="img-header">
                  <img
                    src={post.user && `uploads/avatar/${post.user.avatar}`}
                    alt=""
                  />
                </div>
                <div className="name-header">
                  <h5>{post.user.name}</h5>
                </div>

                {/* post actions */}
                {post.userId === auth.user._id ? (
                  <div className="dropdown ml-auto mr-1">
                    <button
                      className="btn btn-secondary btn-sm dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-toggle="dropdown"
                      // aria-haspopup="true"
                      // aria-expanded="false"
                    ></button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenu2"
                    >
                      <Link
                        className="dropdown-item"
                        to={`/edit-post/${post._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => deletePost(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : null}
                {/* end of post actions */}
              </div>
              <div className="post-img mt-2">
                <img src={post.photo && `uploads/${post.photo}`} alt="" />
                <h6 className="mt-2 ml-2">{post.caption}</h6>
              </div>
              <div className="post-comment">
                <div className="input-group ">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* 
      <div className="row">
        <div className="post mx-auto mt-5 ">
          <div className="header">
            <div className="img-header">
              <img
                src="https://images.unsplash.com/photo-1552960366-b330a2f83823?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
            <div className="name-header">
              <h5>Omar hosny</h5>
            </div>
          </div>
          <div className="post-img mt-2">
            <img
              src="https://images.unsplash.com/photo-1558403299-52a71df71bcf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="post-comment">
            <div className="input-group input-group-lg">
              <input
                type="text"
                placeholder="Add a comment..."
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div> */}
      {/* 
      <div className="row">
        <div className="post mx-auto mt-5 ">
          <div className="header">
            <div className="img-header">
              <img
                src="https://images.unsplash.com/photo-1552960366-b330a2f83823?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
            <div className="name-header">
              <h5>Omar hosny</h5>
            </div>
          </div>
          <div className="post-img mt-2">
            <img
              src="https://images.unsplash.com/photo-1558403299-52a71df71bcf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="post-comment">
            <div className="input-group input-group-lg">
              <input
                type="text"
                placeholder="Add a comment..."
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts, deletePost })(Post);

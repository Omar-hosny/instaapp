import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, createPost } from "../actions/postActions";
import Modal from "./Modal";

const Profile = ({ auth, post, getPosts, createPost, history }) => {
  useEffect(() => {
    getPosts();

    if (post.error !== null) {
      setError(post.error);
    }
    // eslint-disable-next-line
  }, [post.error]);

  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose photo");
  const [error, setError] = useState("");

  const onFileChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onCaptionChange = e => setCaption(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    createPost(formData);
    history.push("/profile");
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-2">{/* <!-- ToDo --> */}</div>
        {/* <!-- avatar --> */}
        <div className="col-md-2 mr-5">
          <div className="profile-img">
            <img
              src={auth.user.avatar && `uploads/avatar/${auth.user.avatar}`}
              className="avatar"
              alt="avatar"
            />
          </div>
        </div>
        {/* <!--  bio --> */}
        <div className=" col-md-6 bio ">{/* <!-- ToDo bio  --> */}</div>
      </div>

      {/* create post modal */}
      <div className="row mt-2 ml-3">
        <Modal title="Create post" btnName="Create new post">
          <form onSubmit={onSubmit}>
            {error ? (
              <div className="alert alert-danger mt-1 mb-1">{error}</div>
            ) : null}
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  onChange={onFileChange}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  {fileName}
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="caption">Caption</label>
              <input
                type="text"
                className="form-control"
                value={caption}
                onChange={onCaptionChange}
              />
            </div>
            <input
              type="submit"
              value="Post"
              className="btn btn-primary mr-1"
            />
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </form>
        </Modal>
      </div>

      {/* end of create post modal */}

      {/* <!-- show posts that user made --> */}
      <div className="row mt-5">
        {post.posts &&
          post.posts.map(post =>
            post.userId === auth.user._id ? (
              <div className="col-md-4 post-profile mt-3" key={post._id}>
                <img src={post.photo && `uploads/${post.photo}`} alt="" />
              </div>
            ) : null
          )}
        {/* 
          <div class="col-md-4 post-profile">
            <img
              src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />
          </div> */}
        {/* <div class="col-md-4 post-profile">
            <img
              src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />
          </div> */}
      </div>
    </div>
  );
};

Profile.propTypes = {
  getPosts: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});
export default connect(mapStateToProps, { getPosts, createPost })(Profile);

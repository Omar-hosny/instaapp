import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, createPost } from "../../actions/postActions";
import { getProfile } from "../../actions/profileActions";

import BIO from "./BIO";
import Modal from "../Modal";
import { useParams } from "react-router-dom";

const Profile = ({
  auth,
  post,
  profile: { profile, loading },
  createPost,
  getProfile,
  history,
}) => {
  const [error, setError] = useState("");
  const { id } = useParams();
  useEffect(() => {
    getProfile(id);
    getPosts();
    if (post.error !== null) {
      setError(post.error);
    }
    // eslint-disable-next-line
  }, [post.error]);

  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose photo");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onCaptionChange = (e) => setCaption(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    createPost(formData);
    history.push(`/profile/${id}`);
  };

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-2">{/* <!-- ToDo --> */}</div>
        {/* <!-- avatar --> */}
        <div className="col-md-2 mr-5">
          <div className="profile-img">
            <img
              src={profile.avatar && `/uploads/avatar/${profile.avatar}`}
              className="avatar"
              alt="avatar"
            />
          </div>
        </div>
        {/* <!--  bio --> */}
        <BIO
          postsNumber={profile.posts && profile.posts.length}
          followersNumber={profile.followers && profile.followers.length}
          followingNumber={profile.following && profile.following.length}
          bio={profile.bio && profile.bio}
        />
        {/* <!--  EndOfBio --> */}
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
        {profile.posts &&
          profile.posts.map((post) => (
            <div className="col-md-4 post-profile mt-3" key={post._id}>
              <img src={post.photo && `/uploads/${post.photo}`} alt="" />
            </div>
          ))}

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
  getProfile: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfile, createPost })(Profile);

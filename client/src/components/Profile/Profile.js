import React, { useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, createPost } from "../../actions/postActions";
import {
  getProfile,
  unFollowUser,
  followUser,
} from "../../actions/profileActions";
// import EditProfileBtn from "./EditProfileBtn";
import ProfilePosts from "./ProfilePosts";

import BIO from "./BIO";
import { useParams, Link } from "react-router-dom";
import Loading from "../loading/Loading";
import CreatePost from "../post/CreatePost";

const Profile = ({
  auth,
  post,
  unFollowUser,
  followUser,
  profile: { profile, loading },
  createPost,
  getProfile,
  history,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getProfile(id);
    getPosts();

    // eslint-disable-next-line
  }, [getPosts, getProfile]);

  if (loading) {
    return <Loading />;
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

        {/* Bio */}
        <BIO />
      </div>

      {/*  create post link */}
      {id === auth.user._id ? (
        <Link className="btn btn-primary ml-3" to="/create-post">
          Add post
        </Link>
      ) : null}

      {/* <!-- show posts that user made --> */}
      <ProfilePosts profile={profile} />
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
  followUser: PropTypes.func.isRequired,
  unFollowUser: PropTypes.func.isRequired,
  // history: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getProfile,
  createPost,
  getPosts,
  followUser,
  unFollowUser,
})(Profile);

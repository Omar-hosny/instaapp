import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, createPost } from "../../actions/postActions";
import { getProfile } from "../../actions/profileActions";

import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
const ProfilePosts = ({
  auth,
  post,
  profile: { profile, loading },
  getProfile,
  history,
}) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="row mt-5">
      {profile.posts &&
        profile.posts.map((post) => (
          <div className="col-md-4 post-profile mt-3" key={post._id}>
            <Link to={`/edit-post/${post._id}`}>
              <img src={post.photo && `/uploads/${post.photo}`} alt="" />
            </Link>
          </div>
        ))}
    </div>
  );
};

ProfilePosts.propTypes = {
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

export default connect(mapStateToProps, {
  getProfile,
  createPost,
  getPosts,
})(ProfilePosts);

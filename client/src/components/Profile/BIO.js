import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { followUser, unFollowUser } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { useState } from "react";

const BIO = ({ followUser, unFollowUser, auth, profile: { profile } }) => {
  // current profile id
  const { id } = useParams();

  const { followers, following } = profile;

  // const indexOfUser = followers && followers.map((f) => f.id);

  // followers and following number state snd show state for handle show follow btn and unFollow btn
  const [show, setShow] = useState(false);
  const [followersNo, setFollowersNo] = useState(0);
  const [followingNo, setFollowingNo] = useState(0);

  // Get  followers and following number and set state for it
  // show follow btn when commpenent load depend on state
  useEffect(() => {
    if (followers || following) {
      setFollowersNo(followers.length);
      setFollowingNo(following.length);
    }

    {
      followers &&
        followers.map((f) =>
          f.id !== auth.user._id ? setShow(false) : setShow(true)
        );
    }

    {
      followersNo === 0 && setShow(false);
    }

    // eslint-disable-next-line
  }, [followers, following, followersNo]);

  // follow and unFollow functions
  const followCount = (id) => {
    followUser(id);
    setFollowersNo(followersNo);
    setShow(true);
  };

  const unFollowCount = (id) => {
    unFollowUser(id);
    setFollowersNo(followersNo);
    setShow(false);
  };

  const showEdit = (
    <Link to={`/profile/edit/${id}`} className="btn btn-primary ">
      Edit profile
    </Link>
  );

  const followBtn = (
    <button onClick={() => followCount(id)} className="btn btn-primary">
      Follow
    </button>
  );

  const unFollowBtn = (
    <button onClick={() => unFollowCount(id)} className="btn btn-danger">
      unFollow
    </button>
  );

  return (
    <div className="col-md-4">
      <div className="edit-btn">
        <h3>{profile.name}</h3>

        {/* EditBTN */}
        {id === auth.user._id ? showEdit : null}

        {/* Hide follow and unFollow btn if current profile === current user */}
        {profile._id !== auth.user._id
          ? !show
            ? followBtn
            : unFollowBtn
          : null}
      </div>

      <div className="user-follow">
        <div>
          <h6>
            <span>{profile.posts && profile.posts.length}</span> posts
          </h6>
        </div>
        <div>
          <h6>
            <span>{followersNo}</span>
            followers
          </h6>
        </div>
        <div>
          <h6>
            <span>{followingNo}</span>
            following
          </h6>
        </div>
      </div>
      <div className="bio-user">
        <h4>{profile.bio && profile.bio}</h4>
      </div>
    </div>
  );
};

BIO.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  // history: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { followUser, unFollowUser })(BIO);

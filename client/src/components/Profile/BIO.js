import React from "react";
import { Link, useParams } from "react-router-dom";

const BIO = ({ postsNumber, followersNumber, followingNumber, bio, name }) => {
  const { id } = useParams();
  return (
    <div className="col-md-4">
      <div className="edit-btn">
        <h3>{name}</h3>
        {/* <EditProfileBtn /> */}
        <Link to={`/profile/edit/${id}`} className="btn btn-primary ">
          Edit profile
        </Link>
      </div>
      <div className="user-follow">
        <div>
          <h6>
            <span>{postsNumber}</span> posts
          </h6>
        </div>
        <div>
          <h6>
            <span>{followersNumber}</span> followers
          </h6>
        </div>
        <div>
          <h6>
            <span>{followingNumber}</span> following
          </h6>
        </div>
      </div>
      <div className="bio-user">
        <h4>{bio}</h4>
      </div>
    </div>
  );
};

export default BIO;

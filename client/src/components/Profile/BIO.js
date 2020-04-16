import React from "react";
import EditProfileBtn from "./EditProfileBtn";

const BIO = ({ postsNumber, followersNumber, followingNumber, bio, name }) => {
  return (
    <div className="col-md-4">
      <div className="edit-btn">
        <h3>{name}</h3>
        <EditProfileBtn />
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

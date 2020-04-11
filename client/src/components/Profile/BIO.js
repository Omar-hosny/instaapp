import React from "react";

const BIO = (props) => {
  return (
    <div className="col-md-4">
      <div className="user-follow">
        <div>
          <h6>
            <span>{props.postsNumber}</span> posts
          </h6>
        </div>
        <div>
          <h6>
            <span>{props.followersNumber}</span> followers
          </h6>
        </div>
        <div>
          <h6>
            <span>{props.followingNumber}</span> following
          </h6>
        </div>
      </div>
      <div className="bio-user">
        <h4>{props.bio}</h4>
      </div>
    </div>
  );
};

export default BIO;

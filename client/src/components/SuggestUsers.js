import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../actions/profileActions";
import { Link } from "react-router-dom";

const SuggestUsers = ({ auth, getUsers, profile: { users } }) => {
  // TODO suggest users to auth user if he does not follow them

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  // console.log(users);

  const { following } = auth.user;
  // let indexOfUser = following && following.map((u) => u.id);
  // let indexOfUser = users && users.map((u) => u._id);

  // let suggestions;

  // // console.log("Not included");
  // suggestions =
  //   users &&
  //   users.map(
  //     (item) =>
  //       !item._id.includes(indexOfUser) && (
  //         <div className="suggestion_users" key={item.id}>
  //           <div>
  //             <img
  //               src={`/uploads/avatar/${item.avatar}`}
  //               alt="avatar"
  //               className="avatar_suggestion_users"
  //             />
  //           </div>
  //           <div className="ml-1 mt-1">
  //             <h6>{item.name}</h6>
  //           </div>
  //           <span className="ml-5">
  //             <button className="suggest_follow">follow</button>
  //           </span>
  //         </div>
  //       )
  //   );

  let test = following.map((f) => f.id);

  let suggestions =
    users &&
    users.map(
      (item) =>
        item._id !== auth.user._id &&
        !test.includes(item._id) && (
          <div className="suggestion_users" key={item.id}>
            <div>
              <img
                src={`/uploads/avatar/${item.avatar}`}
                alt="avatar"
                className="avatar_suggestion_users"
              />
            </div>
            <div className="ml-1 mt-1">
              <Link to={`/profile/${item._id}`}>
                <h6>{item.name}</h6>
              </Link>
            </div>
            <span className="ml-5">
              <button className="suggest_follow">follow</button>
            </span>
          </div>
        )
    );

  return (
    <div className="mt-5 ml-5">
      <div className="auth_suggestion">
        <div>
          <img
            src={`/uploads/avatar/${auth.user.avatar}`}
            alt="avatar"
            className="avatar_suggestion mr-2"
          />
        </div>
        <div>
          <h5>{auth.user.name}</h5>
        </div>
      </div>
      <h6 className="text-muted mt-1 mb-3">Suggested for you</h6>
      <div>{suggestions}</div>
    </div>
  );
};

SuggestUsers.propTypes = {
  auth: PropTypes.object.isRequired,
  getUsers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getUsers })(SuggestUsers);

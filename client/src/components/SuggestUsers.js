import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../actions/profileActions";

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

  // let suggestions =
  //   users &&
  //   users.map((item) => (
  //     <div className="suggestion_users" key={item.id}>
  //       <div>
  //         <img
  //           src={`/uploads/avatar/${item.avatar}`}
  //           alt="avatar"
  //           className="avatar_suggestion_users"
  //         />
  //       </div>
  //       <div className="ml-1 mt-1">
  //         <h6>{item.name}</h6>
  //       </div>
  //       <span className="ml-5">
  //         <button className="suggest_follow">follow</button>
  //       </span>
  //     </div>
  //   ));

  // console.log(indexOfUsers);

  // if (following.map((u) => u.id.includes(indexUsers))) {
  //   console.log("it's included!");
  // } else {
  //   console.log("notYet");
  // }

  // let indexOfUser = users && users.map((u) => u._id);

  // let test2 =
  //   following &&
  //   following.map((f) =>
  //     f.id.includes(indexOfUser) ? "included" : "Notincluded"
  //   );

  // console.log(test2);

  // if (test2.includes(indexOfUser)) {
  //   console.log("Included");
  // } else {
  //   console.log("Not included");
  // }

  let indexOfUser = following && following.map((u) => u.id);

  return (
    <div className="mt-5 ml-5">
      <div className="auth_suggestion">
        <div>
          <img
            src={`/uploads/avatar/${auth.user.avatar}`}
            alt="avatar"
            className="avatar_suggestion"
          />
        </div>
        <div>
          <h5>{auth.user.name}</h5>
        </div>
      </div>
      <h6 className="text-muted mt-4 ml-2 mb-3">Suggested for you</h6>
      {/* <div>{suggestions}</div> */}
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

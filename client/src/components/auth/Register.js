import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

const Register = ({ auth: { error }, registerUser }) => {
  useEffect(() => {
    if (error !== null) {
      setErrors(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState("");

  const { name, email, password } = user;

  // clear errors
  const clearErrors = () => {
    setTimeout(() => {
      setErrors("");
    }, 3000);
  };

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrors("please enter all fields...");
      clearErrors();
    } else {
      const newUser = {
        name,
        email,
        password
      };
      registerUser(newUser);
      setUser({
        name: "",
        email: "",
        password: ""
      });
    }
  };

  return (
    <div className="layout">
      <div className="container">
        <div className="row">
          <div className="col-md-6  mx-auto mt-5">
            <h1 className="text-center">Register</h1>
            {errors ? <div className="alert alert-danger">{errors}</div> : null}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <input
                type="submit"
                value="Register"
                className="btn btn-dark btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(Register);

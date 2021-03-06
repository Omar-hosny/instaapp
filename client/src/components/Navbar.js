import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
const Navbar = ({ auth: { user, isAuthenticated }, logout }) => {
  const logoutUser = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <div className="navbar nav ml-auto">
        <input type="text" className="form-control" placeholder="Search..." />
      </div>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <i className="fa fa-home"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/explore">
            <i className="far fa-images"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to={user !== null ? `/profile/${user._id}` : ""}
          >
            <i className="fa fa-user"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={logoutUser}>
            {/* <i className="fa fa-arrow-right"></i> logout */}
            logout
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-blue bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fab fa-instagram"></i> InstaApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

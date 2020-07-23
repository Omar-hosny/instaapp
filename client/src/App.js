import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import jwt from "jsonwebtoken";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import store from "./store";
import { Provider } from "react-redux";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/Profile/Profile";
import EditPost from "./components/post/EditPost";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import EditProfile from "./components/Profile/EditProfile";
import CreatePost from "./components/post/CreatePost";
import Modal from "./components/Modal";

// keep user logged in unless he logged out
if (localStorage.token) {
  // set auth token header auth
  setAuthToken(localStorage.token);
  // decode token to get user data and info
  const decode = jwt.decode(localStorage.token);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decode));
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/edit-post/:id" component={EditPost} />
            <PrivateRoute exact path="/edit/post" component={Modal} />

            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/create-post" component={CreatePost} />

            <PrivateRoute
              exact
              path="/profile/edit/:id"
              component={EditProfile}
            />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

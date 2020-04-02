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
import Profile from "./components/Profile";
import EditPost from "./components/EditPost";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

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

            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
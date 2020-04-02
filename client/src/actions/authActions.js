import axios from "axios";
import jwt from "jsonwebtoken";
import setAuthToken from "../utils/setAuthToken";

// Register user
export const registerUser = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    setLoading();
    const res = await axios.post("/api/users/register", formData, config);
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: "REGISTER_FAIELD",
      payload: err.response.data
    });
  }
};

// Login user

export const loginUser = formData => async dispatch => {
  setLoading();
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/users/login", formData, config);
    const token = res.data;
    localStorage.setItem("token", token);
    const decode = jwt.decode(token);
    // console.log(token);
    // dispatch({
    //   type: "LOGIN_SUCCESS",
    //   payload: { token, decode }
    // });
    setAuthToken(token);
    dispatch(setCurrentUser(decode));
  } catch (err) {
    dispatch({
      type: "LOGIN_FAIELD",
      payload: err.response.data
    });
  }
};

// SetLoading
export const setLoading = () => {
  return {
    type: "SET_LOADING"
  };
};

// SetLoading
export const logout = () => {
  return {
    type: "LOGOUT_USER"
  };
};

export const setCurrentUser = decode => {
  return {
    type: "SET_CURRENT_USER",
    payload: decode
  };
};

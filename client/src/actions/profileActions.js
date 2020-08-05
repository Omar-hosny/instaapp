import axios from "axios";

// Get profile by id
export const getProfile = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get(`/api/profile/${id}`);
    dispatch({
      type: "GET_PROFILE",
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: "GET_ERRORS",
      payload: err.message,
    });
  }
};

// Edit profile
export const editProfile = (profileData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    dispatch(setLoading());
    const res = await axios.put(
      `/api/profile/edit/${profileData.id}`,
      profileData,
      config
    );
    dispatch({
      type: "EDIT_PROFILE",
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: "GET_PROFILE_ERRORS",
      payload: err.response.message,
    });
  }
};

// Follow user
export const followUser = (id) => async (dispatch) => {
  setLoading();
  try {
    const res = await axios.put(`/api/users/follow/${id}`);
    dispatch({
      type: "FOLLOW_USER",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "GET_PROFILE_ERRORS",
      payload: err.response.data,
    });
  }
};

// UnFollow user
export const unFollowUser = (id) => async (dispatch) => {
  setLoading();
  try {
    const res = await axios.put(`/api/users/unfollow/${id}`);
    dispatch({
      type: "UNFOLLOW_USER",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "GET_PROFILE_ERRORS",
      payload: err.response.data,
    });
  }
};

export const getUsers = () => async (dispatch) => {
  setLoading();
  try {
    const res = await axios.get(`/api/users`);
    dispatch({
      type: "GET_USERS",
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: "GET_PROFILE_ERRORS",
      payload: err.response.data,
    });
  }
};

// SetLoading
export const setLoading = () => {
  return {
    type: "SET_LOADING",
  };
};

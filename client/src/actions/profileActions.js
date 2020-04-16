import axios from "axios";

// Get profile by id
export const getProfile = (id) => async (dispatch) => {
  setLoading();
  try {
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
    setLoading();
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
      payload: err.message,
    });
  }
};

// SetLoading
export const setLoading = () => {
  return {
    type: "SET_LOADING",
  };
};

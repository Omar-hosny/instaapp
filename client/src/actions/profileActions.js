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

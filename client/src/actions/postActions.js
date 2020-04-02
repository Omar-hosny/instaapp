import axios from "axios";

// Get posts from DB
export const getPosts = () => async dispatch => {
  try {
    setLoading();
    const res = await axios.get("/api/posts");
    dispatch({
      type: "GET_POSTS",
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: "GET_ERRORS",
      payload: err.response.data
    });
  }
};

// Create post
export const createPost = postData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  try {
    setLoading();
    const res = await axios.post("/api/posts", postData, config);
    dispatch({
      type: "CREATE_POST",
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: "GET_ERRORS",
      payload: err.response.data
    });
  }
};

// Get post by ID
export const getPost = id => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: "GET_POST",
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: "GET_ERRORS",
      payload: err.response.data
    });
  }
};

// Update Post
export const updatePost = postData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  try {
    setLoading();
    const res = await axios.put(`/api/posts/${postData._id}`, postData, config);
    dispatch({
      type: "UPDATE_POST",
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: "GET_ERRORS",
      payload: err.response.data
    });
  }
};

// Delete post
export const deletePost = id => async dispatch => {
  try {
    setLoading();
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: "DELETE_POST",
      payload: id
    });
  } catch (err) {
    dispatch({
      type: "GET_ERRORS",
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
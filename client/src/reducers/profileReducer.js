const initialState = {
  posts: [],
  current: {},
  profile: {},
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case "GET_ERRORS":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

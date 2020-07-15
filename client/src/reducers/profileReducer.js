const initialState = {
  // posts: [],
  // current: {},
  profile: {},
  // isAuthenticated: false,
  loading: false,
  // user: null,s
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case "EDIT_PROFILE":
      return {
        ...state,
        profile: action.payload,
        // profile:
        //   action.payload._id === state.profile._id
        //     ? action.payload
        //     : state.profile,
        loading: false,
      };
    case "FOLLOW_USER":
      // console.log(action.payload.name);
      return {
        ...state,
        // profile: [state.profile.followers === action.payload],
        profile: action.payload,
        loading: false,
      };
    case "UNFOLLOW_USER":
      // console.log(action.payload);
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case "GET_PROFILE_ERRORS":
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

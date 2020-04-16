const initialState = {
  // posts: [],
  // current: {},
  profile: {},
  // isAuthenticated: false,
  loading: false,
  // user: null,
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      console.log(state.profile);
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case "EDIT_PROFILE":
      return {
        ...state,
        // profile: state.profile.profile.map((item) =>
        //   item._id === action.payload._id ? action.payload : item
        // ),
        profile:
          action.payload._id === state.profile._id
            ? action.payload
            : state.profile,
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

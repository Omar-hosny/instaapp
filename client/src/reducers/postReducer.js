const initialState = {
  posts: [],
  current: {},
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    // case "CREATE_POST":
    //   return {
    //     ...state,
    //     posts: state.posts,
    //     loading: false,
    //   };
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case "GET_FEED":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case "GET_POST":
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        current: action.payload,
        loading: false,
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case "LIKE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        loading: false,
      };
    case "UNLIKE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        loading: false,
      };
    case "GET_ERRORS":
      return {
        ...state,
        loading: false,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

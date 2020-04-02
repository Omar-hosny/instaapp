const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case "LOGIN_SUCCESS":
      // localStorage.setItem("token", action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.decode
      };
    case "REGISTER_FAIELD":
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload
      };
    case "LOGIN_FAIELD":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };

    case "LOGOUT_USER":
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
        user: null,
        error: null
      };
    default:
      return state;
  }
};

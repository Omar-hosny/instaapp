import { combineReducers } from "redux";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  post: postReducer,
  profile: profileReducer,
});

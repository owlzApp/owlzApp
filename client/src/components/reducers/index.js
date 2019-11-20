import { combineReducers } from "redux";
import auth from "./auth";
import reservation from "./reservation";

import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth: auth,
  form: formReducer,
  reservations: reservation
});

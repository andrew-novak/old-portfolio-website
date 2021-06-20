import { combineReducers } from "redux";

import mediaLinks from "./mediaLinks";
import segments from "./segments";
import projects from "./projects";
import project from "./project";
import { RESET_STATE } from "constants/actionTypes";

const appReducer = combineReducers({
  mediaLinks,
  segments,
  projects,
  project,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

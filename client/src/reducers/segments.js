import { SET_SEGMENTS } from "constants/actionTypes";

const initialState = {};

const segments = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEGMENTS:
      return { ...action.segments };

    default:
      return state;
  }
};

export default segments;

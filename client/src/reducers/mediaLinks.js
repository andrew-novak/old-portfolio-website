import { SET_MEDIA_LINKS } from "constants/actionTypes";

const initialState = {};

const mediaLinks = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEDIA_LINKS:
      return { ...action.mediaLinks };

    default:
      return state;
  }
};

export default mediaLinks;

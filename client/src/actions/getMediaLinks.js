import axios from "axios";

import { PUBLIC_API_URL } from "constants/urls";
import { SET_MEDIA_LINKS } from "constants/actionTypes";

const getMediaLinks = () => (dispatch) =>
  axios({
    method: "GET",
    url: `${PUBLIC_API_URL}/media-links`,
  }).then((res) => {
    const { mediaLinks } = res.data;
    dispatch({
      type: SET_MEDIA_LINKS,
      mediaLinks,
    });
  });

export default getMediaLinks;

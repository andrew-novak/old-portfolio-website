import axios from "axios";

import { PUBLIC_API_URL } from "constants/urls";
import { SET_SEGMENTS } from "constants/actionTypes";

const getSegments = () => (dispatch) =>
  axios({
    method: "GET",
    url: `${PUBLIC_API_URL}/segments`,
  }).then((res) => {
    const { segments } = res.data;
    dispatch({
      type: SET_SEGMENTS,
      segments,
    });
  });

export default getSegments;

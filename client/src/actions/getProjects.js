import axios from "axios";

import { PUBLIC_API_URL } from "constants/urls";
import { SET_PROJECTS } from "constants/actionTypes";

const getProjects = () => (dispatch) =>
  axios({
    method: "GET",
    url: `${PUBLIC_API_URL}/projects`,
  }).then((res) => {
    const { projects } = res.data;
    dispatch({
      type: SET_PROJECTS,
      projects,
    });
  });

export default getProjects;

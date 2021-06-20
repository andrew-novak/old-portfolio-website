import axios from "axios";

import { PUBLIC_API_URL } from "constants/urls";
import { SET_PROJECT } from "constants/actionTypes";

const getProject = (projectId) => (dispatch) =>
  axios({
    method: "GET",
    url: `${PUBLIC_API_URL}/projects/${projectId}`,
  }).then((res) => {
    const { project } = res.data;
    if (project) return dispatch({ type: SET_PROJECT, project });
  });

export default getProject;

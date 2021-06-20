import axios from "axios";

import { API_URL } from "./constants/urls";

const url = `${API_URL}/admin/login`;

const authProvider = {
  login: ({ username, password }) => {
    return axios({
      method: "POST",
      url,
      //headers: { 'Content-Type': 'application/json' },
      data: { adminName: username, password },
    })
      .then((res) => {
        const { data, status, statusText } = res;
        if (status < 200 || status >= 300) {
          throw new Error(statusText);
        }
        return data.idToken;
      })
      .then((idToken) => {
        localStorage.setItem("idToken", idToken);
      });
  },

  logout: () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  },

  checkAuth: (params) =>
    localStorage.getItem("idToken") ? Promise.resolve() : Promise.reject(),

  checkError: (error) => {
    const { status } = error;
    if (status === 401 || status === 403) {
      localStorage.removeItem("idToken");
      return Promise.reject({ redirectTo: "/login" });
    }
    return Promise.resolve();
  },

  getPermissions: (params) => Promise.resolve(),

  getIdentity: () => Promise.resolve(),
};

export default authProvider;

import { fetchUtils } from "react-admin";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const idToken = localStorage.getItem("idToken");
  options.headers.set("Authorization", `Bearer ${idToken}`);
  return fetchUtils.fetchJson(url, options);
};

export default httpClient;

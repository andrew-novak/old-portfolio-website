import getMediaLinks from "./getMediaLinks";
import getSegments from "./getSegments";
import getProjects from "./getProjects";

const getHomepageData = () => (dispatch) => {
  dispatch(getMediaLinks());
  dispatch(getSegments());
  dispatch(getProjects());
};

export default getHomepageData;

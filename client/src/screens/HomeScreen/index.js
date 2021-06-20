import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";

import NavBar from "components/NavBar";
import Segments from "./Segments";
import Projects from "./Projects";
import getHomepageData from "actions/getHomepageData";

const Home = ({ getHomepageData }) => {
  useEffect(() => {
    getHomepageData();
  }, [getHomepageData]);

  return (
    <Fragment>
      <NavBar />
      <Segments />
      <Projects />
    </Fragment>
  );
};

export default connect(null, { getHomepageData })(Home);

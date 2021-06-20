import React, { Fragment } from "react";
import { useHistory, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ProjectScreen from "screens/ProjectScreen";
import HomeScreen from "screens/HomeScreen";
import resetState from "actions/resetState";

const Routes = ({ projects, resetState }) => {
  const history = useHistory();

  history.listen(location => resetState);

  return (
    <Fragment>
      <Route path="/" exact component={HomeScreen} />
      <Route path="/project/:projectId" exact component={ProjectScreen} />
      <Redirect to="/" />
    </Fragment>
  );
};

const mapState = state => {
  const { projects } = state;
  return { projects };
};

export default connect(mapState, { resetState })(Routes);

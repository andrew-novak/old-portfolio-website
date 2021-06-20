import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";

import Segment from "./Segment";

const useStyles = makeStyles((theme) => ({
  marginWrapper: {
    marginTop: theme.spacing(theme.custom.itemMargin * 2),
    marginBottom: theme.spacing(theme.custom.sectionMargin),
  },
}));

const Segments = ({ segments }) => {
  const classes = useStyles();
  if (Object.entries(segments).length < 1) {
    return null;
  }
  const displaySegments = Object.entries(segments).map(([key, segment]) => (
    <Segment {...segment} />
  ));
  return (
    <div className={classes.marginWrapper}>
      <Container maxWidth="md">{displaySegments}</Container>
    </div>
  );
};

const mapState = (state) => {
  const { segments } = state;
  return { segments };
};

export default connect(mapState)(Segments);

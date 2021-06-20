import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme, Container, Typography, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Project from "./Project";

const useStyles = makeStyles((theme) => ({
  marginWrapper: {
    marginTop: theme.spacing(theme.custom.itemMargin),
    marginBottom: theme.spacing(theme.custom.sectionMargin),
  },
}));

const Projects = ({ projects }) => {
  const classes = useStyles();
  const theme = useTheme();

  // Display 4 Items Max:
  // <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
  const renderProjects = Object.entries(projects).map(
    ([key, project], index) => (
      <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
        <Project {...project} />
      </Grid>
    )
  );

  return (
    <Container maxWidth="xl">
      <div className={classes.marginWrapper}>
        <Typography variant="h4" align="center" gutterBottom>
          My Projects
        </Typography>
        <Grid
          className={classes.root}
          container
          spacing={theme.custom.itemMargin}
        >
          {renderProjects}
        </Grid>
      </div>
    </Container>
  );
};

const mapState = (state) => {
  const { projects } = state;
  return { projects };
};

export default connect(mapState)(Projects);

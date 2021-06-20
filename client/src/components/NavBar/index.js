import React, { Fragment } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import HomeButton from "./HomeButton";
import MediaLinks from "./MediaLinks";

const useStyles = makeStyles((theme) => ({
  flexGrow1: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <HomeButton />
          <div className={classes.flexGrow1} />
          <MediaLinks />
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </Fragment>
  );
};

export default NavBar;

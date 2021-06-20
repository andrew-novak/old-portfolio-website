import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import logo from "./logo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
  },
  logo: {
    height: 46,
    marginRight: 10,
    [theme.breakpoints.up("sm")]: {
      height: 50,
    },
  },
  text: {
    fontFamily: "Dancing Script",
    fontSize: 28,
    letterSpacing: 2,
    background: "linear-gradient(45deg, #3c58b7ff, 30%, #bd16c3)",
    WebkitBackgroundClip: "text",
    textFillColor: "transparent",
  },
}));

const HomeButton = () => {
  const classes = useStyles();

  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  const sm = useMediaQuery("(max-width: 450px)");

  return (
    <div className={classes.root} onClick={handleClick}>
      <img src={logo} className={classes.logo} alt="logo" />
      {sm ? null : (
        <Typography classes={{ root: classes.text }} color="inherit">
          Andrew Novak
        </Typography>
      )}
    </div>
  );
};

export default HomeButton;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme, Card, CardMedia, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(theme.custom.sectionMargin),
  },
  imageCard: {
    width: 200,
    height: 200,
    borderRadius: "100%",
  },
  media: {
    width: 200,
    height: 200,
  },
  textContainer: {
    marginTop: theme.spacing(2),
    maxWidth: 700,
  },
}));

const Segment = ({ imageUrl, header, text }) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {imageUrl ? (
        <Card
          className={classes.imageCard}
          elevation={theme.custom.elevation * 0}
        >
          <CardMedia classes={{ root: classes.media }} image={imageUrl} />
        </Card>
      ) : null}

      <div className={classes.textContainer}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className={classes.header}
        >
          {header}
        </Typography>
        <Typography align="center" className={classes.text}>
          {text}
        </Typography>
      </div>
    </div>
  );
};

export default Segment;

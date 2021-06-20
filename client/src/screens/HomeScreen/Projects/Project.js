import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  useTheme,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: theme.custom.percentHeight169,
  },
}));

const Project = ({ id, title, description, imageUrl }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const handleClick = () => {
    history.push(`/project/${id}`);
  };

  return (
    <Card elevation={theme.custom.elevation}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          classes={{ root: classes.media }}
          image={imageUrl}
          title={title}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Project;

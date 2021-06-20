import React, { useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  useTheme,
  useMediaQuery,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { connect } from "react-redux";

import NavBar from "components/NavBar";
import getProject from "actions/getProject";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginWrapper: {
    marginTop: theme.spacing(theme.custom.itemMargin),
    marginBottom: theme.spacing(theme.custom.itemMargin),
  },
  media: {
    height: 0,
    paddingTop: theme.custom.percentHeight169,
  },
  carousel: {
    marginBottom: 10,
  },
  slide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: 350,
  },
  linksUnderTitle: {
    marginBottom: theme.spacing(2),
  },
  linkMarginTop: {
    marginTop: theme.spacing(2),
  },
  link: {
    color: "#b100b8",
  },
}));

const ProjectScreen = ({ project, getProject }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { projectId } = useParams();
  const { title, description, imageUrl, imageUrlExtra, links = [] } = project;

  useEffect(() => {
    getProject(projectId);
  }, [getProject, projectId]);

  const anyLinks = links.length > 0;

  const md = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const images = [imageUrl];
  if (imageUrlExtra) images.push(imageUrlExtra);

  const Image = ({ url }) => (
    <CardMedia classes={{ root: classes.media }} image={url} />
  );

  const Slider = ({ images }) => (
    <Carousel timeout={100} className={classes.carousel}>
      {images.map((url, index) => (
        <Image key={index} url={url} />
      ))}
    </Carousel>
  );

  const displayLinks = links.map(({ text, url }, index) => (
    <div key={index} className={index ? classes.linkMarginTop : null}>
      <Typography>{text}</Typography>
      <Link className={classes.link} href={url}>
        {url}
      </Link>
    </div>
  ));

  return (
    <Fragment>
      <NavBar />
      <Container maxWidth={anyLinks ? "lg" : "md"}>
        <div className={classes.marginWrapper}>
          <Grid container spacing={theme.custom.itemMargin}>
            <Grid item xs={12} md={anyLinks ? 8 : 12}>
              <Card elevation={theme.custom.elevation}>
                {images.length > 1 ? (
                  <Slider images={images} />
                ) : (
                  <Image url={images[0]} />
                )}
              </Card>

              <Card
                elevation={theme.custom.elevation}
                className={classes.marginTop}
              >
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {title}
                  </Typography>
                  {anyLinks && !md ? (
                    <div className={classes.linksUnderTitle}>
                      {displayLinks}
                    </div>
                  ) : null}
                  <Typography>{description}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {anyLinks && md ? (
              <Grid item xs={12} md={4}>
                <Card elevation={theme.custom.elevation}>
                  <CardContent>{displayLinks}</CardContent>
                </Card>
              </Grid>
            ) : null}
          </Grid>
        </div>
      </Container>
    </Fragment>
  );
};

const mapState = (state) => {
  const { project } = state;
  return { project };
};

export default connect(mapState, { getProject })(ProjectScreen);

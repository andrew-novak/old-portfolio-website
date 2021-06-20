import React, { Fragment } from "react";
import { IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import Instagram from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { connect } from "react-redux";

const MediaLinks = ({ mediaLinks }) => {
  const iconVariants = {
    facebook: <FacebookIcon />,
    github: <GitHubIcon />,
    instagram: <Instagram />,
    linkedin: <LinkedInIcon />,
    twitter: <TwitterIcon />,
    youtube: <YouTubeIcon />,
  };

  return (
    <Fragment>
      {Object.entries(mediaLinks).map(([key, link], index) => {
        const { variant, url } = link;
        return (
          <IconButton key={index} color="inherit" href={url}>
            {iconVariants[variant]}
          </IconButton>
        );
      })}
    </Fragment>
  );
};

const mapState = (state) => {
  const { mediaLinks } = state;
  return { mediaLinks };
};

export default connect(mapState)(MediaLinks);

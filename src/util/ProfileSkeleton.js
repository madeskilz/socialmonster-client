import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import NoImg from "../images/no-img.png";
import { Paper } from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday
} from "@material-ui/icons";
const styles = theme => ({
  ...theme.styles,
  handle:{
      height:20,
      backgroundColor: theme.palette.primary.main,
      width: 60,
      margin: "0 auto 7px auto"
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.6)",
    margin: "0 auto 10px auto"
  },
});
const ProfileSkeleton = props => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" />
          <span>Location</span>
          <hr />
          <LinkIcon color="primary" />
          http:website.com
          <hr />
          <CalendarToday color="primary" />
          <span>Joined Date</span>
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);

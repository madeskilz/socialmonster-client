import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import NoImg from "../images/no-img.png";
const styles = theme => ({
  ...theme.style
});
const ProfileSkeleton = props => {
  return <div>Loading Profile</div>;
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Grid, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
const styles = theme => ({
  ...theme.styles,
  commentImage: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "50%"
  },
  commentData: {
    marginLeft: 20
  }
});
class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container spacing={2}>
        {comments.map((comment, index) => {
          const { body, createdAt, userImgUrl, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImgUrl}
                      className={classes.commentImage}
                      alt={userHandle}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}
Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Comments));

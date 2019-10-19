import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { getScream } from "../redux/actions/dataActions";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MyButton from "../util/MyButton";
import { UnfoldMore, Close as CloseIcon } from "@material-ui/icons";
import {
  Button,
  Dialog,
  CircularProgress,
  DialogTitle,
  TextField,
  DialogContent,
  Grid
} from "@material-ui/core";
const styles = theme => ({
    ...theme.styles,
    invisibleSeparator:{
        border: "none",
        margin: 4
    }
});
class ScreamDialog extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        userHandle,
        createdAt,
        likeCount,
        commentCount,
        userImgUrl
      },
      UI: { loading }
    } = this.props;
    const dialogMarkup = loading ? (
      <CircularProgress size={200} />
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img
            src={userImgUrl}
            alt={userHandle}
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            to={`/users/${userHandle}`}
            variant="h5"
            color="primary"
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          tip="View Scream"
          onClick={this.handleOpen}
          btnClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="md"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            btnClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  Ui: state.UI
});

const mapActionsToProps = {
  getScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));

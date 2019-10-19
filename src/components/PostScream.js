import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { postScream, clearErrors } from "../redux/actions/dataActions";
import MyButton from "../util/MyButton";
import { Add as AddIcon, Close as CloseIcon } from "@material-ui/icons";
import {
  Button,
  Dialog,
  CircularProgress,
  DialogTitle,
  TextField,
  DialogContent
} from "@material-ui/core";
const styles = theme => ({
  ...theme.styles,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    top: "6%",
    left: "91%"
  }
});
class PostScream extends Component {
  state = { open: false, body: "", errors: {} };
  componentWillReceiveProps(nextProps) {
    nextProps.UI.errors && this.setState({ errors: nextProps.UI.errors });
    !nextProps.UI.errors &&
      !nextProps.UI.loading &&
      this.setState({ open: false, body: "", errors: {} });
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, body: "", errors: {} });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const newScream = {
      body: this.state.body
    };
    this.props.postScream(newScream);
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton tip="Post New Scream!" onClick={this.handleOpen}>
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            btnClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post New Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Scream!!!"
                placeholder="Scream at your fellow monsters"
                multiline
                fullWidth
                error={errors.body ? true : false}
                helperText={errors.body}
                rows="3"
                onChange={this.handleChange}
                className={classes.textField}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Scream
                {loading && (
                  <CircularProgress
                    className={classes.progressSpinner}
                    size={30}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

const mapActionsToProps = {
  postScream,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostScream));

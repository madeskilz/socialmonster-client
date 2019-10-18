import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MyButton from "../util/MyButton";
import {
  Button,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";
import { editUserDetails } from "../redux/actions/userActions";
import { Edit as EditIcon } from "@material-ui/icons";

const styles = theme => ({
  ...theme.styles,
  button: {
    float: "right"
  }
});
class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  mapUserDetailsToState(credentials) {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A shot bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="url"
                label="Website"
                fullWidth
                placeholder="http://website.com"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                fullWidth
                placeholder="Lagos, NG"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

const mapActionsToProps = {
  editUserDetails
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(EditDetails));

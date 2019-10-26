import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, TextField, Grid, withStyles } from "@material-ui/core";
import { submitComment } from "../../redux/actions/dataActions";
const styles = theme => ({
  ...theme.styles
});
class CommentForm extends Component {
  state = { body: "", errors: {} };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.submitComment(this.props.screamId, { body: this.state.body });
  };
  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;
    const commentFormMarkup = authenticated && (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on Scream"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Comment
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    );
    return commentFormMarkup;
  }
}
CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  screamId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

const mapActionsToProps = {
  submitComment
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CommentForm));

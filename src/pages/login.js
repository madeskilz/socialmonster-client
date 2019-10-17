import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Logo from "../images/logo.jpg";

//MUI Stuffs
import {
  TextField,
  Typography,
  Grid,
  Button,
  CircularProgress
} from "@material-ui/core";
//Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
const styles = theme => ({
  ...theme.styles
});
class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    nextProps.UI.errors && this.setState({ errors: nextProps.UI.errors });
  }
  handleSubmit = e => {
    e.preventDefault();
    const userData = { email: this.state.email, password: this.state.password };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors, email, password } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Logo} alt="Social Monster" className={classes.image} />
          <Typography variant="h1" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              fullWidth
              label="Email"
              helperText={errors.email}
              error={errors.email ? true : false}
              className={classes.textField}
              value={email}
              onChange={this.handleChange}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              fullWidth
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={password}
              onChange={this.handleChange}
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <br />
            <small>
              Don't have an account? <Link to="/signup">Signup Here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});
const mapActionsToProps = {
  loginUser
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));

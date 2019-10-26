import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading
      ? screams.map(scream => (
          <Scream scream={scream} key={scream.screamId}></Scream>
        ))
      : Array.from({ length: 3 }).map(i => <ScreamSkeleton key={Math.random()} />);
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
home.propTypes = {
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

const mapActionsToProps = {
  getScreams
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(home);

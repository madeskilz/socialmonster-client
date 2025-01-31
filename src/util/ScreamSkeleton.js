import React, { Fragment } from "react";
import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";
import { Card, CardMedia, CardContent } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: "cover"
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: "#bf360c",
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 10
  }
};
const ScreamSkeleton = props => {
  const { classes } = props;
  const screamSkeleton = Array.from({ length: 3 }).map(i => (
    <Card className={classes.card} key={Math.random()}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{screamSkeleton}</Fragment>;
};
ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ScreamSkeleton);

import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Badge
} from "@material-ui/core";
import {
  Notifications as NotificationsIcon,
  Favorite as FavoriteIcon,
  Chat as ChatIcon
} from "@material-ui/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { markNotificationsRead } from "../../redux/actions/userActions";
class Notifications extends Component {
  state = {
    anchorEl: null
  };
  handleOpen = e => {
    this.setState({ anchorEl: e.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    let unreadNotificationIds = this.props.notifications
      .filter(n => !n.read)
      .map(n => n.notificationId);
    this.props.markNotificationsRead(unreadNotificationIds);
  };
  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;
    dayjs.extend(relativeTime);
    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(n => n.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={notifications.filter(n => n.read === false).length}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }
    let notificationsMarkUp =
      notifications && notifications.length > 0 ? (
        notifications.map(n => {
          const verb = n.type === "like" ? "liked" : "commented on";
          const time = dayjs(n.createdAt).fromNow();
          const iconColor = n.read ? "primary" : "secondary";
          const icon =
            n.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={n.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/users/${n.recipient}/scream/${n.screamId}`}
              >
                {n.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>You have no notification</MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkUp}
        </Menu>
      </Fragment>
    );
  }
}
Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  notifications: state.user.notifications
});

const mapActionsToProps = {
  markNotificationsRead
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Notifications);

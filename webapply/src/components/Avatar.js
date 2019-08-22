import React from "react";
import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const style = {
  greenAvatar: {
    backgroundColor: "#166a2c",
    width: "40px",
    fontSize: "14px",
    fontWeight: 600
  },
  emptyAvatar: {
    backgroundColor: "#ffffff",
    border: "solid 1px #d3d8db",
    width: "40px"
  }
};
const UserAvatar = props => {
  const { firstName = "", lastName = "", classes } = props;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  return initials ? (
    <Avatar className={classes.greenAvatar}>{initials}</Avatar>
  ) : (
    <Avatar className={classes.emptyAvatar} />
  );
};

export default withStyles(style)(UserAvatar);

import React from "react";
import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { avatarColors } from "../constants/assets";

const style = {
  greenAvatar: {
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
  const { firstName = "", lastName = "", classes, index } = props;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  const style =
    index === 5
      ? { backgroundImage: "linear-gradient(to left, #675848, #706152 0%)" }
      : { background: avatarColors[index || 0] };
  return initials && firstName !== "New Stakeholder" ? (
    <Avatar className={classes.greenAvatar} style={style}>
      {initials}
    </Avatar>
  ) : (
    <Avatar className={classes.emptyAvatar} />
  );
};

export default withStyles(style)(UserAvatar);

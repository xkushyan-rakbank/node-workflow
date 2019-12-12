import React from "react";
import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import { ColoredAvatar } from "./ColoredAvatar";
import { avatarColors } from "../../constants/assets";

const style = {
  emptyAvatar: {
    backgroundColor: "#ffffff",
    border: "solid 1px #d3d8db"
  },
  defaultAvatar: {
    width: "20px"
  }
};

const UserAvatar = props => {
  const { firstName = "", lastName = "", classes, index, defaultAvatarIcon, isEmptyAvatar } = props;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  if (isEmptyAvatar) {
    return (
      <Avatar className={classes.emptyAvatar}>
        {defaultAvatarIcon && (
          <img src={defaultAvatarIcon} alt="defaultIcon" className={classes.defaultAvatar} />
        )}
      </Avatar>
    );
  }

  return <ColoredAvatar color={avatarColors[index || 0]}>{initials}</ColoredAvatar>;
};

export default withStyles(style)(UserAvatar);

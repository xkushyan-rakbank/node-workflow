import React from "react";
import Avatar from "@material-ui/core/Avatar";

import { ColoredAvatar } from "./ColoredAvatar";
import { avatarColors } from "./avatarColors";
import { useStyles } from "./styled";

export const UserAvatar = ({
  firstName = "",
  lastName = "",
  index,
  defaultAvatarIcon,
  isEmptyAvatar
}) => {
  const classes = useStyles();

  if (isEmptyAvatar) {
    return (
      <Avatar className={classes.emptyAvatar}>
        {defaultAvatarIcon && (
          <img src={defaultAvatarIcon} alt="defaultIcon" className={classes.defaultAvatar} />
        )}
      </Avatar>
    );
  }

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  return <ColoredAvatar color={avatarColors[index || 0]}>{initials}</ColoredAvatar>;
};

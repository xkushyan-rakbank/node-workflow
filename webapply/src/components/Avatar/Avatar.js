import React from "react";
import UserAvatar from "@material-ui/core/Avatar";

import { ColoredAvatar } from "./ColoredAvatar";
import { avatarColors } from "./avatarColors";
import { useStyles } from "./styled";

export const Avatar = ({
  firstName = "",
  lastName = "",
  fullName = "",
  index,
  defaultAvatarIcon,
  isEmptyAvatar
}) => {
  const classes = useStyles();

  if (isEmptyAvatar) {
    return (
      <UserAvatar className={classes.emptyAvatar} data-testid="empty-avatar">
        {defaultAvatarIcon && (
          <img src={defaultAvatarIcon} alt="defaultIcon" className={classes.defaultAvatar} />
        )}
      </UserAvatar>
    );
  }

  const firstAndLastName = fullName ? fullName.split(/\s/) : [firstName, lastName];
  const initials = firstAndLastName.map(name => name.charAt(0)).join("");
  return (
    <ColoredAvatar color={avatarColors[(index || 0) % avatarColors.length]}>
      {initials}
    </ColoredAvatar>
  );
};

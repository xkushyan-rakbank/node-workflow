import React from "react";
import { makeStyles } from "@material-ui/styles";

import { Avatar } from "../Avatar/Avatar";

const useStyles = makeStyles({
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    height: "40px",
    margin: "30px 32px 30px 20px"
  }
});

export const FilledInfoCard = ({ firstName, lastName, content, index, defaultAvatarIcon }) => {
  const classes = useStyles();

  return (
    <div className={classes.contentWrapper}>
      <Avatar
        firstName={firstName}
        lastName={lastName}
        index={index}
        defaultAvatarIcon={defaultAvatarIcon}
        isEmptyAvatar={!firstName && !lastName}
      />
      {content}
    </div>
  );
};

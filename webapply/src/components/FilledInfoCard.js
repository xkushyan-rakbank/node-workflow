import React from "react";
import { withStyles } from "@material-ui/core";
import Avatar from "./Avatar";

const style = {
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    height: "62px",
    margin: "30px 20px"
  }
};

const FilledInfoCard = props => {
  const { firstName, lastName, content, classes, index, defaultAvatarIcon } = props;

  return (
    <div className={classes.contentWrapper}>
      <Avatar
        firstName={firstName}
        lastName={lastName}
        index={index}
        defaultAvatarIcon={defaultAvatarIcon}
      />
      {content}
    </div>
  );
};

export default withStyles(style)(FilledInfoCard);

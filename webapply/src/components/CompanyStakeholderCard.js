import React from "react";
import { withStyles } from "@material-ui/core";
import cx from "classnames";
import Avatar from "./Avatar";

const style = {
  wrapper: {
    width: "100%",
    display: "flex",
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    flexDirection: "column",
    marginBottom: "24px"
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    height: "62px",
    margin: "30px 20px"
  },
  greenAvatar: {
    backgroundColor: "#166a2c",
    width: "40px",
    fontSize: "14px",
    fontWeight: 600
  },
  nameField: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.33,
    color: "#373737"
  },
  signatoryField: {
    fontSize: "14px",
    lineHeight: "1.71",
    color: "#517085"
  },
  shareholdingField: {
    opacity: 0.5,
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#263d4c"
  }
};

const CompanyStakeholderCard = props => {
  const { firstName, lastName, classes, className } = props;
  return (
    <div className={cx(classes.wrapper, className)}>
      <div className={classes.contentWrapper}>
        <Avatar firstName={firstName} lastName={lastName} />
        {props.content}
      </div>
      {props.children}
    </div>
  );
};

export default withStyles(style)(CompanyStakeholderCard);

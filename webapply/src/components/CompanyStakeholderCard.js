import React from "react";
import { withStyles } from "@material-ui/core";
import cx from "classnames";
import FilledInfoCard from "./FilledInfoCard";

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
  }
};

const CompanyStakeholderCard = props => {
  const { firstName, lastName, content, classes, className, index } = props;
  return (
    <div className={cx(classes.wrapper, className)}>
      <FilledInfoCard firstName={firstName} lastName={lastName} content={content} index={index} />
      {props.children}
    </div>
  );
};

export default withStyles(style)(CompanyStakeholderCard);

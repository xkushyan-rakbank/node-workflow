import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/styles";
import { FilledInfoCard } from "./FilledInfoCard";

const useStyles = makeStyles({
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
});

export const FormCard = ({
  firstName,
  lastName,
  content,
  className,
  index,
  defaultAvatarIcon,
  children
}) => {
  const classes = useStyles();

  return (
    <div className={cx(classes.wrapper, className)}>
      <FilledInfoCard
        firstName={firstName}
        lastName={lastName}
        content={content}
        index={index}
        defaultAvatarIcon={defaultAvatarIcon}
      />
      {children}
    </div>
  );
};

import React from "react";
import cx from "classnames";

import FilledInfoCard from "../FilledInfoCard";
import { useStyles } from "./styled";

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

import React from "react";
import cx from "classnames";

import StatusLoader from "../../../../components/StatusLoader";
import Avatar from "../../../../components/Avatar/Avatar";
import { useStyles } from "./styled";

export const CompanyStakeholderCard = ({
  firstName,
  lastName,
  className,
  index,
  isStatusShown,
  isStatusLoading,
  children
}) => {
  const classes = useStyles();
  return (
    <div className={cx(classes.wrapper, className)}>
      <div className={classes.contentWrapper}>
        <Avatar
          firstName={firstName}
          lastName={lastName}
          index={index}
          isEmptyAvatar={!firstName.length}
        />

        <div className={classes.userInfo}>
          <div className={classes.nameField}>
            {firstName.length ? `${firstName} ${lastName}` : "New Stakeholder"}
          </div>
          {isStatusShown && <StatusLoader loading={isStatusLoading} />}
        </div>
      </div>

      {children}
    </div>
  );
};

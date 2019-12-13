import React from "react";
import cx from "classnames";

import StatusLoader from "../../../../components/StatusLoader";
import { UserAvatar as Avatar } from "../../../../components/Avatar/Avatar";
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
          isEmptyAvatar={!firstName}
        />

        <div className={classes.userInfo}>
          <div className={classes.nameField}>
            {firstName ? `${firstName} ${lastName}` : "New Stakeholder"}
          </div>
          {isStatusShown && <StatusLoader loading={isStatusLoading} />}
        </div>
      </div>

      {children}
    </div>
  );
};

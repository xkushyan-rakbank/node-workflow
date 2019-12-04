import React from "react";
import cx from "classnames";

import StatusLoader from "../../../../components/StatusLoader";
import Avatar from "../../../../components/Avatar";
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
        {isStatusShown && <Avatar firstName={firstName} lastName={lastName} index={index} />}

        <div className={classes.userInfo}>
          <div className={classes.nameField}>
            {isStatusShown && firstName.length ? `${firstName} ${lastName}` : "New Stakeholder"}
          </div>
          {isStatusShown && <StatusLoader loading={isStatusLoading} />}
        </div>
      </div>

      {children}
    </div>
  );
};

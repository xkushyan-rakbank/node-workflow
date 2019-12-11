import React from "react";
import cx from "classnames";

import { useStyles } from "./styled";

export const AuditTrail = ({ prospectInfo = {} }) => {
  const classes = useStyles();

  return prospectInfo.applicationInfo ? (
    <div className={classes.wrapper}>
      <div className={classes.applicationRow}>
        <div>
          <div className={cx(classes.checkListData, classes.heading)}>Modified By</div>
        </div>
        <div>
          <div className={cx(classes.checkListData, classes.heading)}>Modified On</div>
        </div>
      </div>
      <div className={classes.applicationRow}>
        <div>
          <div className={classes.checkListData}>
            {prospectInfo.applicationInfo.lastModifiedBy !== ""
              ? prospectInfo.applicationInfo.lastModifiedBy
              : prospectInfo.applicationInfo.createdBy}
          </div>
        </div>
        <div>
          <div className={classes.checkListData}>
            {prospectInfo.applicationInfo.lastModifiedDate !== ""
              ? prospectInfo.applicationInfo.lastModifiedDate
              : prospectInfo.applicationInfo.createdDate}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={classes.errorMsg}>Fields are not modified yet.</div>
  );
};

import React from "react";
import get from "lodash/get";
import cx from "classnames";

import { useStyles } from "./styled";

export const AuditTrail = ({ prospectInfo = {} }) => {
  const classes = useStyles();
  return get(prospectInfo, "AuditTrailInfo[0]", {}) ? (
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
            {get(prospectInfo, "AuditTrailInfo[0].modifiedBy", "")}
          </div>
        </div>
        <div>
          <div className={classes.checkListData}>
            {get(prospectInfo, "AuditTrailInfo[0].modifiedDateTime", "")}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={classes.errorMsg}>Fields are not modified yet.</div>
  );
};

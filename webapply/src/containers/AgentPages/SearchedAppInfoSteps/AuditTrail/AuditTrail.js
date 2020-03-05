import React from "react";
import cx from "classnames";

import { useStyles } from "./styled";

export const AuditTrail = ({ prospectOverview = {} }) => {
  const classes = useStyles();
  const revertedAuditTrailInfo = [...(prospectOverview.AuditTrailInfo || [])].reverse();

  return revertedAuditTrailInfo.length ? (
    <div className={classes.wrapper}>
      <div className={classes.applicationRow}>
        <div className={cx(classes.checkListData, classes.heading)}>Modified By</div>
        <div className={cx(classes.checkListData, classes.heading)}>Modified On</div>
      </div>
      {revertedAuditTrailInfo.map((item, index) => (
        <div className={classes.applicationRow} key={index}>
          <div className={classes.checkListData}>{item.modifiedBy}</div>
          <div className={classes.checkListData}>{item.modifiedDateTime}</div>
        </div>
      ))}
    </div>
  ) : (
    <div className={classes.errorMsg}>Fields are not modified yet.</div>
  );
};

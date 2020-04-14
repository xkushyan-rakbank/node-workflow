import React from "react";
import cx from "classnames";

import { formatAuditTrailInfo } from "../../utils/formatAuditTrailInfo";

import { useStyles } from "./styled";

export const AuditTrail = ({ prospectOverview = {} }) => {
  const classes = useStyles();
  const auditTrailInfo = formatAuditTrailInfo(prospectOverview.AuditTrailInfo);

  return auditTrailInfo.length ? (
    <div className={classes.wrapper}>
      <div className={classes.applicationRow}>
        <div className={cx(classes.checkListData, classes.heading)}>Modified By</div>
        <div className={cx(classes.checkListData, classes.heading)}>Modified On</div>
      </div>
      {auditTrailInfo.map((item, index) => (
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

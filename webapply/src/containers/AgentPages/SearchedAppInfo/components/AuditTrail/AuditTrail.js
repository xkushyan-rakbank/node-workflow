import React, { useMemo } from "react";
import sortBy from "lodash/sortBy";
import cx from "classnames";

import { useStyles } from "./styled";

const formatAuditTrailInfo = ({ modifiedDateTime, ...rest }) => {
  let [date, time] = modifiedDateTime.split(" ");
  date = date
    .split("-")
    .reverse()
    .join("-");

  return {
    ...rest,
    modifiedDateTime: [date, time].join(" ")
  };
};

export const AuditTrail = ({ prospectOverview = {} }) => {
  const classes = useStyles();
  const auditTrailInfo = prospectOverview.AuditTrailInfo || [];
  const sortedAuditTrailInfo = useMemo(
    () => sortBy(auditTrailInfo.map(formatAuditTrailInfo), ["modifiedDateTime"]).reverse(),
    [auditTrailInfo]
  );

  return sortedAuditTrailInfo && sortedAuditTrailInfo.length ? (
    <div className={classes.wrapper}>
      <div className={classes.applicationRow}>
        <div className={cx(classes.checkListData, classes.heading)}>Modified By</div>
        <div className={cx(classes.checkListData, classes.heading)}>Modified On</div>
      </div>
      {sortedAuditTrailInfo.map((item, index) => (
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

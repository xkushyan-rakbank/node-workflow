import React from "react";
import cx from "classnames";
import { sortBy } from "lodash";

import { useStyles } from "./styled";

const revertedAuditTrailInfo = auditTrailInfo => {
  const newAuditTrailInfo = auditTrailInfo.map(trailInfo => {
    let date = trailInfo.modifiedDateTime.split(" ");
    date[0] = date[0]
      .split("-")
      .reverse()
      .join("-");
    return {
      modifiedBy: trailInfo.modifiedBy,
      modifiedDateTime: date.join(" ")
    };
  });
  return newAuditTrailInfo;
};

export const AuditTrail = ({ prospectOverview = {} }) => {
  const classes = useStyles();
  const auditTrailInfo = prospectOverview.AuditTrailInfo || [];
  const sortedAuditTrailInfo = revertedAuditTrailInfo(
    sortBy(revertedAuditTrailInfo(auditTrailInfo), ["modifiedDateTime"]).reverse()
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

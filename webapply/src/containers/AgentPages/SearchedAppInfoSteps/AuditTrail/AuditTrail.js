import React from "react";
import cx from "classnames";

import { useStyles } from "./styled";

export const AuditTrail = ({ prospectInfo = {} }) => {
  const classes = useStyles();
  const revertedAuditTrailInfo = [...(prospectInfo.AuditTrailInfo || [])].reverse();

  return revertedAuditTrailInfo.length ? (
    <div className={classes.wrapper}>
      <div className={classes.applicationRow}>
        <div>
          <div className={cx(classes.checkListData, classes.heading)}>Modified By</div>
        </div>
        <div>
          <div className={cx(classes.checkListData, classes.heading)}>Modified On</div>
        </div>
      </div>
      {revertedAuditTrailInfo.map((item, index) => (
        <div className={classes.applicationRow} key={index}>
          <div>
            <div className={classes.checkListData}>{item.modifiedBy}</div>
          </div>
          <div>
            <div className={classes.checkListData}>{item.modifiedDateTime}</div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className={classes.errorMsg}>Fields are not modified yet.</div>
  );
};

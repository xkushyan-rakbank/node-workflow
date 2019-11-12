import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { style } from "./style";
import { titles, errorMsgs } from "./constants";

const AuditTrail = ({ classes, prospectInfo = {} }) => {
  const headingClassName = `${classes.checkListData} ${classes.heading}`;
  return prospectInfo.applicationInfo ? (
    <div className={classes.wrapper}>
      <div className={classes.applicationRow}>
        <div>
          <div className={headingClassName}>{titles.MODIFIED_BY_TITLE}</div>
        </div>
        <div>
          <div className={headingClassName}>{titles.MODIFIED_ON_TITLE}</div>
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
    <div className={classes.errorMsg}>{errorMsgs.MODIFY_ERROR}</div>
  );
};

export default withStyles(style)(AuditTrail);

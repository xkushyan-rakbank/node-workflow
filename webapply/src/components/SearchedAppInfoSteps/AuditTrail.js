import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  wrapper: {
    marginTop: "24px",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    marginBottom: "20px"
  },
  applicationRow: {
    borderBottom: "1px solid #e6e6e6",
    "&:last-of-type": {
      border: "none"
    },
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    padding: "24px 20px 19px 30px"
  },
  checkListData: {
    fontSize: "14px",
    lineHeight: 1.33,
    color: "#86868b",
    marginTop: 5
  },
  heading: {
    fontWeight: 600,
    color: "#000"
  },
  errorMsg: {
    fontWeight: 600,
    fontSize: "20px",
    marginBottom: "24px"
  }
};

const AuditTrail = props => {
  const { classes, prospectInfo = [] } = props;

  return prospectInfo.applicationInfo ? (
    <div className={classes.wrapper}>
      <div className={classes.applicationRow}>
        <div>
          <div className={classes.checkListData + " " + classes.heading}>Modified By</div>
        </div>
        <div>
          <div className={classes.checkListData + " " + classes.heading}>Modified On</div>
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

export default withStyles(style)(AuditTrail);

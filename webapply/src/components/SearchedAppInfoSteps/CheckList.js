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
    gridTemplateColumns: "2fr 2fr 1fr",
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

const CheckList = props => {
  const { classes, prospectInfo } = props;

  return prospectInfo.preScreeningInfo &&
    prospectInfo.preScreeningInfo.screeningResults &&
    prospectInfo.preScreeningInfo.screeningResults.length > 0 ? (
    <div className={classes.wrapper}>
      <div className={classes.applicationRow}>
        <div>
          <div className={classes.checkListData + " " + classes.heading}>Check Name</div>
        </div>
        <div>
          <div className={classes.checkListData + " " + classes.heading}>Status</div>
        </div>
        <div>
          <div className={classes.checkListData + " " + classes.heading}>Result/Reason</div>
        </div>
      </div>
      {prospectInfo.preScreeningInfo.screeningResults.map((application, index) => (
        <div className={classes.applicationRow} key={index}>
          <div>
            <div className={classes.checkListData}>
              {application.screeningType && application.screeningType}
            </div>
          </div>
          <div>
            <div className={classes.checkListData}>
              {application.screeningStatus && application.screeningStatus}
            </div>
          </div>
          <div>
            <div className={classes.checkListData}>
              {application.screeningReason && application.screeningReason}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className={classes.errorMsg}>There is no check list.</div>
  );
};

export default withStyles(style)(CheckList);

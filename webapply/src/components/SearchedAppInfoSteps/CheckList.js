import React from "react";
import get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "../../components/Avatar";

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
    marginTop: 5,
    wordBreak: "break-word"
  },
  heading: {
    fontWeight: 600,
    color: "#000"
  },
  errorMsg: {
    fontWeight: 600,
    fontSize: "20px",
    marginBottom: "24px"
  },
  title: {
    marginTop: "0px",
    color: "#373737",
    fontSize: "15px",
    alignItems: "center",
    fontWeight: "600"
  },
  errorMsgInsideTable: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "0px",
    padding: "20px 20px 20px 30px"
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    height: "62px",
    margin: "20px 35px 20px 25px"
  },
  nameField: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.33,
    color: "#373737"
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "0 16px"
  }
};

const CheckList = props => {
  const { classes, prospectInfo = [] } = props;

  return (
    <>
      <h4 className={classes.title}>Company</h4>
      {get(prospectInfo, "organizationInfo.screeningInfo.screeningResults", []).length ? (
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
          {prospectInfo.organizationInfo.screeningInfo.screeningResults.map(
            (application, index) => (
              <div className={classes.applicationRow} key={index}>
                <div>
                  <div className={classes.checkListData}>{application.screeningType}</div>
                </div>
                <div>
                  <div className={classes.checkListData}>{application.screeningStatus}</div>
                </div>
                <div>
                  <div className={classes.checkListData}>{application.screeningReason}</div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className={classes.errorMsg}>Company check list is not available.</div>
      )}
      <h4 className={classes.title}>Stakeholder</h4>
      {get(prospectInfo, "signatoryInfo", []).length ? (
        prospectInfo.signatoryInfo.map((signatory, index) => (
          <div key={index}>
            <div className={classes.contentWrapper}>
              <Avatar firstName={signatory.fullName} />
              <div className={classes.userInfo}>
                <div className={classes.nameField}>{signatory.fullName}</div>
              </div>
            </div>
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
              {get(signatory, "screeningInfo.screeningResults", []).length ? (
                signatory.screeningInfo.screeningResults.map((application, index) => (
                  <div className={classes.applicationRow} key={index}>
                    <div>
                      <div className={classes.checkListData}>{application.screeningType}</div>
                    </div>
                    <div>
                      <div className={classes.checkListData}>{application.screeningStatus}</div>
                    </div>
                    <div>
                      <div className={classes.checkListData}>{application.screeningReason}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={classes.errorMsgInsideTable}>
                  Check list is not available for this stakeholder.
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={classes.errorMsg}>Stakeholder check list is not available.</div>
      )}
    </>
  );
};

export default withStyles(style)(CheckList);

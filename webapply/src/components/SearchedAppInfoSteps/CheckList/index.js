import React from "react";
import get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "../../../components/Avatar";
import { style } from "./style";
import { titles, errorMsgs } from "./constants";

const CheckList = props => {
  const { classes, prospectInfo = [] } = props;
  const headingClassName = `${classes.checkListData} ${classes.heading}`;
  return (
    <>
      <h4 className={classes.title}>{titles.COMPANY_TITLE}</h4>
      {get(prospectInfo, "organizationInfo.screeningInfo.screeningResults", []).length ? (
        <div className={classes.wrapper}>
          <div className={classes.applicationRow}>
            <div>
              <div className={headingClassName}>{titles.CHECK_NAME_TITLE}</div>
            </div>
            <div>
              <div className={headingClassName}>{titles.STATUS_TITLE}</div>
            </div>
            <div>
              <div className={headingClassName}>{titles.RESULT_REASON_TITLE}</div>
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
        <div className={classes.errorMsg}>{errorMsgs.COMPANY_CHECKLIST_ERROR}</div>
      )}
      <h4 className={classes.title}>{titles.STAKEHOLDER_TITLE}</h4>
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
                  <div className={headingClassName}>{titles.CHECK_NAME_TITLE}</div>
                </div>
                <div>
                  <div className={headingClassName}>{titles.STATUS_TITLE}</div>
                </div>
                <div>
                  <div className={headingClassName}>{titles.RESULT_REASON_TITLE}</div>
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
                <div className={classes.errorMsgInsideTable}>{errorMsgs.STAKEHOLDER_ERROR}</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.STAKEHOLDERS_CHECKLIST_ERROR}</div>
      )}
    </>
  );
};

export default withStyles(style)(CheckList);

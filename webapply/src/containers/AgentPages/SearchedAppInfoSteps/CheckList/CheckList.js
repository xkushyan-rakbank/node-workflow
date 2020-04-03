import React from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import cx from "classnames";

import { Avatar } from "../../../../components/Avatar/Avatar";
import { getFilledOverviewSignatories } from "../../../../store/selectors/searchProspect";
import {
  getCompanyChecks,
  getOrganizationScreeningResults
} from "../../../../store/selectors/screeningResults";

import { useStyles } from "./styled";
import { titles } from "./constants";

export const CheckList = () => {
  const signatoryInfo = useSelector(getFilledOverviewSignatories);
  const companyChecks = useSelector(getCompanyChecks);
  const companyInfo = useSelector(getOrganizationScreeningResults);
  const classes = useStyles();
  const headingClassName = cx(classes.checkListData, classes.heading);

  return (
    <>
      <h4 className={classes.title}>{titles.COMPANY_TITLE}</h4>
      {companyInfo.length ? (
        <div className={classes.wrapper}>
          <div className={classes.applicationRow}>
            <div className={headingClassName}>{titles.CHECK_NAME_TITLE}</div>
            <div className={headingClassName}>{titles.STATUS_TITLE}</div>
            <div className={headingClassName}>{titles.RESULT_REASON_TITLE}</div>
          </div>
          {companyChecks.map(application => (
            <div className={classes.applicationRow} key={application.screeningType}>
              <div className={classes.checkListData}>{application.screeningType}</div>
              <div className={classes.checkListData}>{application.screeningStatus}</div>
              <div className={classes.checkListData}>{application.screeningReason}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.errorMsg}>Company check list is not available.</div>
      )}
      <h4 className={classes.title}>{titles.STAKEHOLDER_TITLE}</h4>
      {signatoryInfo.length ? (
        signatoryInfo.map((signatory, index) => (
          <div key={signatory.signatoryId}>
            <div className={classes.contentWrapper}>
              <Avatar fullName={signatory.fullName} index={index} />
              <div className={classes.userInfo}>
                <div className={classes.nameField}>{signatory.fullName}</div>
              </div>
            </div>
            <div className={classes.wrapper}>
              <div className={classes.applicationRow}>
                <div className={headingClassName}>{titles.CHECK_NAME_TITLE}</div>
                <div className={headingClassName}>{titles.STATUS_TITLE}</div>
                <div className={headingClassName}>{titles.RESULT_REASON_TITLE}</div>
              </div>
              {get(signatory, "screeningInfo.screeningResults", []).length ? (
                signatory.screeningInfo.screeningResults.map(application => (
                  <div className={classes.applicationRow} key={application.screeningType}>
                    <div className={classes.checkListData}>{application.screeningType}</div>
                    <div className={classes.checkListData}>{application.screeningStatus}</div>
                    <div className={classes.checkListData}>{application.screeningReason}</div>
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

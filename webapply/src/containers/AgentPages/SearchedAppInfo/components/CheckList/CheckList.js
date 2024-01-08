import React from "react";
import get from "lodash/get";
import cx from "classnames";

import { Avatar } from "../../../../../components/Avatar/Avatar";

import { useStyles } from "./styled";
import { titles } from "./constants";

const statusesToHighlight = ["Decline"];

export const CheckList = ({
  signatoryInfo,
  companyChecks,
  companyInfo,
  companyAdditionalInfo,
  ...props
}) => {
  const classes = useStyles();
  const headingClassName = cx(classes.checkListData, classes.heading);
  const isReviewSumbit = props.isReviewSubmit ? classes.reviewSubmit : "";
  return (
    <>
      <h4 className={cx(classes.title, isReviewSumbit)}>{titles.COMPANY_TITLE}</h4>
      {companyInfo.length ? (
        <div className={cx(classes.wrapper, isReviewSumbit)}>
          <div className={classes.applicationRow}>
            <div className={headingClassName}>{titles.CHECK_NAME_TITLE}</div>
            <div className={headingClassName}>{titles.STATUS_TITLE}</div>
            <div className={headingClassName}>{titles.RESULT_REASON_TITLE}</div>
          </div>
          {companyChecks.map(application => {
            const changeBackground = statusesToHighlight.includes(application.screeningReason)
              ? classes.declined
              : "";
            return (
              <div
                className={cx(classes.applicationRow, changeBackground)}
                key={application.screeningType}
              >
                <div className={classes.checkListData}>{application.screeningType}</div>
                <div className={classes.checkListData}>{application.screeningStatus}</div>
                <div className={classes.checkListData}>{application.screeningReason}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={classes.errorMsg}>Company check list is not available.</div>
      )}
      {props.isReviewSubmit ? (
        <h4 className={cx(classes.title, isReviewSumbit)}>{titles.STAKEHOLDER_TITLE}</h4>
      ) : null}
      {signatoryInfo.length ? (
        signatoryInfo.map((signatory, index) => (
          <div key={signatory.signatoryId}>
            {!props.isReviewSubmit && signatory.firstName ? (
              <div className={classes.contentWrapper}>
                <Avatar fullName={signatory.fullName} index={index} />
                <div className={classes.userInfo}>
                  <div className={classes.nameField}>{signatory.fullName}</div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className={cx(classes.wrapper, isReviewSumbit)}>
              <div className={classes.applicationRow}>
                <div className={headingClassName}>{titles.CHECK_NAME_TITLE}</div>
                <div className={headingClassName}>{titles.STATUS_TITLE}</div>
                <div className={headingClassName}>{titles.RESULT_REASON_TITLE}</div>
              </div>
              {get(signatory, "screeningInfo.screeningResults", []).length ? (
                signatory.screeningInfo.screeningResults.map(application => {
                  const changeBackground = statusesToHighlight.includes(application.screeningReason)
                    ? classes.declined
                    : "";
                  return (
                    <div
                      className={cx(classes.applicationRow, changeBackground)}
                      key={application.screeningType}
                    >
                      <div className={classes.checkListData}>{application.screeningType}</div>
                      <div className={classes.checkListData}>{application.screeningStatus}</div>
                      <div className={classes.checkListData}>{application.screeningReason}</div>
                    </div>
                  );
                })
              ) : (
                <div className={classes.errorMsgInsideTable}>
                  Check list is not available for this stakeholder.
                </div>
              )}
            </div>
            <h4 className={cx(classes.title)}>{titles.COMPANY_ADDITIONAL_INFO}</h4>
            <div className={cx(classes.wrapper, isReviewSumbit)}>
              <div className={classes.applicationRow}>
                <div className={headingClassName}>{titles.CHECK_NAME_TITLE}</div>
                <div className={headingClassName}>{titles.STATUS_TITLE}</div>
                <div className={headingClassName}>{titles.RESULT_REASON_TITLE}</div>
              </div>
              {companyAdditionalInfo.length ? (
                companyAdditionalInfo.map(application => {
                  const changeBackground = statusesToHighlight.includes(application.screeningReason)
                    ? classes.declined
                    : "";
                  return (
                    <div
                      className={cx(classes.applicationRow, changeBackground)}
                      key={application.screeningType}
                    >
                      <div className={classes.checkListData}>{application.screeningType}</div>
                      <div className={classes.checkListData}>{application.screeningStatus}</div>
                      <div className={classes.checkListData}>{application.screeningReason}</div>
                    </div>
                  );
                })
              ) : (
                <div className={classes.errorMsgInsideTable}>
                  Check list is not available for company additional info.
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

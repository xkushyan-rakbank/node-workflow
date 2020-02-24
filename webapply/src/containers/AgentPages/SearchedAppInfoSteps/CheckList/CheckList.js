import React from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import cx from "classnames";

import { Avatar } from "../../../../components/Avatar/Avatar";
import { titles, errorMsgs } from "./constants";
import { getSignatories } from "../../../../store/selectors/appConfig";

import { useStyles } from "./styled";
import { getCompanyChecksSelector } from "./selectors";

export const CheckList = () => {
  const { signatoryInfo, companyChecks } = useSelector(state => ({
    signatoryInfo: getSignatories(state),
    companyChecks: getCompanyChecksSelector(state)
  }));
  const classes = useStyles();
  const headingClassName = cx(classes.checkListData, classes.heading);

  return (
    <>
      <h4 className={classes.title}>{titles.COMPANY_TITLE}</h4>
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
        {companyChecks.map(application => (
          <div className={classes.applicationRow} key={application.screeningType}>
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
        ))}
      </div>
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
                signatory.screeningInfo.screeningResults.map(application => (
                  <div className={classes.applicationRow} key={application.screeningType}>
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

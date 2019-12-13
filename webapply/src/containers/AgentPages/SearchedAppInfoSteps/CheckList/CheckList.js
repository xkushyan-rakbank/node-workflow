import React from "react";
import get from "lodash/get";
import cx from "classnames";

import { UserAvatar as Avatar } from "../../../../components/Avatar/Avatar";
import { titles, errorMsgs } from "./constants";

import { useStyles } from "./styled";

export const CheckList = ({ prospectInfo = {} }) => {
  const classes = useStyles();
  const headingClassName = cx(classes.checkListData, classes.heading);
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
      {(prospectInfo.signatoryInfo || []).length ? (
        prospectInfo.signatoryInfo.map((signatory, index) => {
          const [firstName, lastName] = signatory.fullName.split(/\s/);
          return (
            <div key={signatory.signatoryId}>
              <div className={classes.contentWrapper}>
                <Avatar firstName={firstName} lastName={lastName} index={index} />
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
          );
        })
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.STAKEHOLDERS_CHECKLIST_ERROR}</div>
      )}
    </>
  );
};

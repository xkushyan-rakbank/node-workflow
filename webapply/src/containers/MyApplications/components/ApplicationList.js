import React from "react";
import cx from "classnames";

import { ctaStatuses, notCtaStatuses } from "../constants";
import { WhiteContainedButton } from "./WhiteContainedButton";
import { STATUS_LOCKED } from "../../AgentPages/SearchedAppInfo/constants";
import { useStyles } from "./styled";

export const ApplicationList = ({
  getProspectInfo,
  getProspectInfoWithoutStatus,
  applicantInfo = []
}) => {
  const classes = useStyles();

  return applicantInfo.map(app => (
    <div className={classes.wrapper} key={app.prospectId}>
      <div className={classes.applicationRow}>
        {app.organizationInfo.companyName ? (
          <div className={app.status ? classes.oneThirdWidth : classes.fullWidth}>
            <div className={classes.companyName}>{app.organizationInfo.companyName}</div>
            <div className={classes.listAccount}>{app.applicationInfo.accountType}</div>
          </div>
        ) : (
          <div className={app.status ? classes.oneThirdWidth : classes.fullWidth}>
            <div className={classes.companyName}>{app.applicantInfo.fullName}</div>
            <div className={classes.listAccount}>{app.applicantInfo.email}</div>
          </div>
        )}
        {app.status
          ? [
              <div key="status" className={classes.oneThirdWidth}>
                <span className={classes.listStatus}>{app.status.statusNotes}</span>
              </div>,
              <div className={cx(classes.action, classes.oneThirdWidth)} key="action">
                {ctaStatuses[app.status.statusNotes] ? (
                  <>
                    <WhiteContainedButton
                      disabled={app.status.reasonCode === STATUS_LOCKED}
                      label={ctaStatuses[app.status.statusNotes].buttonText}
                      handleClick={() => getProspectInfo(app.prospectId)}
                    />
                    <div className={classes.hint}>
                      {ctaStatuses[app.status.statusNotes].mobileStatus}
                    </div>
                  </>
                ) : (
                  <span>{notCtaStatuses[app.status.statusNotes]}</span>
                )}
              </div>
            ]
          : [
              <div key="status" className={classes.oneThirdWidth}>
                <span className={classes.listStatus}>Incomplete</span>
              </div>,
              <div className={cx(classes.action, classes.oneThirdWidth)} key="action">
                <WhiteContainedButton
                  label="Finish Application"
                  handleClick={() => getProspectInfoWithoutStatus(app.prospectId)}
                />
                <div className={classes.hint}>
                  {ctaStatuses[app.status.statusNotes].mobileStatus}
                </div>
              </div>
            ]}
      </div>
    </div>
  ));
};

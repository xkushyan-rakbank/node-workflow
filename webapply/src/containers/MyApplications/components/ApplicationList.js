import React from "react";
import cx from "classnames";

import { ctaStatuses, notCtaStatuses } from "../constants";
import routes, { smeBaseName } from "../../../routes";
import { WhiteContainedButton } from "./WhiteContainedButton";
import { STATUS_LOCKED } from "../../AgentPages/SearchedAppInfo/constants";
import { useStyles } from "./styled";

export const ApplicationList = ({ getProspectInfo, applicantInfo = [] }) => {
  const classes = useStyles();
  const appSubmittedPath = routes.ApplicationSubmitted.replace(smeBaseName, "");

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
                  <WhiteContainedButton
                    disabled={app.status.reasonCode === STATUS_LOCKED}
                    label={ctaStatuses[app.status.statusNotes]}
                    handleClick={() => getProspectInfo(app.prospectId)}
                  />
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
                {appSubmittedPath === app.applicationInfo.viewId ? (
                  <span>{notCtaStatuses.NoStatusYet}</span>
                ) : (
                  <WhiteContainedButton
                    label="Finish Application"
                    handleClick={() => getProspectInfo(app.prospectId)}
                  />
                )}
              </div>
            ]}
      </div>
    </div>
  ));
};

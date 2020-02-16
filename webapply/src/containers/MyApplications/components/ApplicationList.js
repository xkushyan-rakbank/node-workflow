import React from "react";
import cx from "classnames";
import { isEmpty } from "lodash";

import { ctaStatuses, notCtaStatuses } from "../constants";
import { WhiteContainedButton } from "./WhiteContainedButton";
import { STATUS_LOCKED } from "../../AgentPages/SearchedAppInfo/constants";
import { useStyles } from "./styled";
import { SkeletonLoader } from "./../../../components/Form";

export const ApplicationList = ({ getProspectInfo, applicantInfo = [] }) => {
  const classes = useStyles();

  if (isEmpty(applicantInfo)) {
    return Array.from(new Array(4)).map((_, index) => {
      return (
        <div className={classes.wrapper} key={index}>
          <div className={classes.applicationRow}>
            <SkeletonLoader width={210} height={50} style={{ marginBottom: 2 }} />
            <SkeletonLoader width={100} height={30} style={{ marginLeft: 200, marginBottom: 0 }} />
            <SkeletonLoader width={200} height={40} style={{ marginLeft: 50, marginBottom: 0 }} />
          </div>
        </div>
      );
    });
  }

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
                <WhiteContainedButton
                  label="Finish Application"
                  handleClick={() => getProspectInfo(app.prospectId)}
                />
              </div>
            ]}
      </div>
    </div>
  ));
};

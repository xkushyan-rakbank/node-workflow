import React from "react";

import { ctaStatus, ctaWaterText, withoutCtaStatus, withoutCtaWaterText } from "../constants";
import { WhiteContainedButton } from "./WhiteContainedButton";

import { useStyles } from "./styled";

export const ApplicationList = ({ getProspectInfo, applicantInfo = [] }) => {
  const classes = useStyles();

  return applicantInfo.map(app => (
    <div className={classes.wrapper} key={app.prospectId}>
      <div className={classes.applicationRow}>
        {app.organizationInfo.companyName ? (
          <div>
            <div className={classes.companyName}>{app.organizationInfo.companyName}</div>
            <div className={classes.listAccount}>
              {`${app.applicationInfo.accountType} ${
                app.applicationInfo.islamicBanking ? "islamic" : ""
              }`}
            </div>
          </div>
        ) : (
          <div>
            <div className={classes.companyName}>{app.applicantInfo.fullName}</div>
            <div className={classes.listAccount}>{app.applicantInfo.email}</div>
          </div>
        )}
        <div>
          <span className={classes.listStatus}>{app.status.statusNotes}</span>
        </div>
        <div className={classes.action}>
          {ctaStatus.includes(app.status.statusNotes) ? (
            <WhiteContainedButton
              label={ctaWaterText[ctaStatus.indexOf(app.status.statusNotes)]}
              handleClick={() => getProspectInfo(app.prospectId)}
              disabled={app.applicationInfo.lastModifiedBy.trim().length > 0}
            />
          ) : (
            <span>
              {withoutCtaStatus.includes(app.status.statusNotes) &&
                withoutCtaWaterText[withoutCtaStatus.indexOf(app.status.statusNotes)]}
            </span>
          )}
        </div>
      </div>
    </div>
  ));
};

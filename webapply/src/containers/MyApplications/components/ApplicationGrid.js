import React from "react";
import Typography from "@material-ui/core/Typography";

import { WhiteContainedButton } from "./WhiteContainedButton";
import { ctaStatus, ctaWaterText, withoutCtaStatus, withoutCtaWaterText } from "../constants";

import { useStyles } from "./styled";

import waves_background from "../../../assets/images/waves_bg.png";

export const ApplicationGrid = ({ getProspectInfo, applicantInfo = [] }) => {
  const classes = useStyles();

  return applicantInfo.map(app => (
    <div className={classes.gridContainer} key={app.prospectId}>
      <div className={classes.application}>
        <img src={waves_background} className={classes.containerBg} alt="waves background" />
        {app.organizationInfo.companyName ? (
          <>
            <Typography variant="h6" component="span" classes={{ root: classes.title }}>
              {app.organizationInfo.companyName}
            </Typography>
            <Typography variant="subtitle2" component="span" classes={{ root: classes.account }}>
              {`${app.applicationInfo.accountType} ${
                app.applicationInfo.islamicBanking ? "islamic" : ""
              }`}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" component="span" classes={{ root: classes.title }}>
              {app.applicantInfo.fullName}
            </Typography>
            <Typography variant="subtitle2" component="span" classes={{ root: classes.account }}>
              {app.applicantInfo.email}
            </Typography>
          </>
        )}
        <div className={classes.status}>{app.status.statusNotes}</div>
        <div className={classes.blockAction}>
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

import React from "react";
import Typography from "@material-ui/core/Typography";
import cx from "classnames";

import { WhiteContainedButton } from "./WhiteContainedButton";
import { ctaStatuses, notCtaStatuses } from "../constants";
import { STATUS_LOCKED } from "../../AgentPages/SearchedAppInfo/constants";

import { useStyles } from "./styled";

import { ReactComponent as WavesBG } from "../../../assets/images/waves_bg.svg";

export const ApplicationGrid = ({ getProspectInfo, applicantInfo = [] }) => {
  const classes = useStyles();

  return applicantInfo.map(app => (
    <div className={classes.gridContainer} key={app.prospectId}>
      <div className={classes.application}>
        <WavesBG className={classes.containerBg} alt="waves background" />
        {app.organizationInfo.companyName ? (
          <>
            <Typography variant="h6" component="span" classes={{ root: classes.title }}>
              {app.organizationInfo.companyName}
            </Typography>
            <Typography variant="subtitle2" component="span" classes={{ root: classes.account }}>
              {app.applicationInfo.accountType}
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
        {app.status
          ? [
              <div key="status" className={classes.status}>
                {app.status.statusNotes}
              </div>,
              <div key="action" className={cx(classes.blockAction, "hide-on-mobile")}>
                {ctaStatuses[app.status.statusNotes] ? (
                  <WhiteContainedButton
                    disabled={app.status.reasonCode === STATUS_LOCKED}
                    label={ctaStatuses[app.status.statusNotes]}
                    handleClick={() => getProspectInfo(app.prospectId)}
                  />
                ) : (
                  notCtaStatuses[app.status.statusNotes] && (
                    <div className={classes.statusNotes}>
                      {notCtaStatuses[app.status.statusNotes]}
                    </div>
                  )
                )}
              </div>
            ]
          : [
              <div key="status" className={classes.status}>
                Incomplete
              </div>,
              <div key="action" className={cx(classes.blockAction, "hide-on-mobile")}>
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

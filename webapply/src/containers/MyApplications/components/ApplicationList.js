import React from "react";
import cx from "classnames";

import { ctaStatuses, notCtaStatuses, RO_LABEL } from "../constants";
import { getTitleForAccountType } from "../utils";
import { WhiteContainedButton } from "./WhiteContainedButton";
import { STATUS_LOCKED } from "../../AgentPages/SearchedAppInfo/constants";
import { useStyles } from "./styled";

export const ApplicationList = ({ getProspectInfo, applicantInfo = [], loadingProspectId }) => {
  const classes = useStyles();
  return applicantInfo.map(app => (
    <div className={classes.wrapper} key={app.prospectId}>
      <div className={classes.applicationRow}>
        <div className={app.status ? classes.oneThirdWidth : classes.fullWidth}>
          <div className={classes.companyName}>{app.organizationInfo?.companyName}</div>
          <div className={classes.listAccount}>
            {getTitleForAccountType(app.applicationInfo?.accountType)}
          </div>
          <div className={classes.listAccount}>
            {app.applicationInfo?.roEmail ||
            app.applicationInfo?.roLandlineNo ||
            app.applicationInfo?.roMobileNo
              ? RO_LABEL
              : ""}
          </div>
          <div className={classes.listAccount}>
            {app.applicationInfo?.roName ? app.applicationInfo?.roName : ""}
          </div>
          <div className={classes.listAccount}>
            {app.applicationInfo?.roEmail ? app.applicationInfo?.roEmail : ""}
          </div>
          <div className={classes.listAccount}>
            {app.applicationInfo?.roLandlineNo ? app.applicationInfo?.roLandlineNo : ""}
          </div>
          <div className={classes.listAccount}>
            {app.applicationInfo?.roMobileNo ? app.applicationInfo?.roMobileNo : ""}
          </div>
        </div>
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
                      isDisplayLoader={loadingProspectId === app.prospectId}
                    />
                    {/* <div className={classes.hint}>
                      {ctaStatuses[app.status.statusNotes].mobileStatus}
                    </div> */}
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
                  handleClick={() => getProspectInfo(app.prospectId)}
                />
                {/* <div className={classes.hint}>
                  {ctaStatuses[app.status.statusNotes].mobileStatus}
                </div> */}
              </div>
            ]}
      </div>
    </div>
  ));
};

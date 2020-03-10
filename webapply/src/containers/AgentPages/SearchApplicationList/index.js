import React from "react";
import { generatePath } from "react-router";
import { Link } from "react-router-dom";
import cx from "classnames";
import routes from "../../../routes";
import { useStyles } from "./styled";

export const SearchApplicationList = ({ currentApplications }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.applicationRow}>
        <div className={classes.column}>
          <div className={classes.heading}>Applicant{"'"}s Detail</div>
        </div>
        <div className={classes.column}>
          <div className={classes.heading}>Company Detail</div>
        </div>
        <div className={classes.column}>
          <div className={classes.heading}>Status</div>
        </div>
      </div>
      {currentApplications.map(application => {
        return (
          <Link
            className={cx(classes.applicationRow)}
            key={application.prospectId}
            to={generatePath(routes.SearchedAppInfo, { id: application.prospectId })}
          >
            <div className={classes.column}>
              <div className={classes.fullName}>{application.applicantInfo.fullName}</div>
              <div className={classes.account}>{application.applicantInfo.email}</div>
              <span className={classes.account}>
                {`${application.applicantInfo.countryCode || ""} ${application.applicantInfo
                  .mobileNo || ""}`}
              </span>
              <span className={classes.account}>
                <br />
                {`Lead No. - ${application.organizationInfo.leadNumber || ""}`}
              </span>
            </div>
            <div className={classes.column}>
              <div className={classes.companyName}>{application.organizationInfo.companyName}</div>
              <div className={classes.account}>
                {`TL No. - ${application.organizationInfo.licenseNumber || ""}`}
              </div>
            </div>
            <div className={classes.column}>
              {application.status ? (
                <div className={classes.status}>{application.status.statusNotes}</div>
              ) : (
                <div className={classes.status}>Incomplete</div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

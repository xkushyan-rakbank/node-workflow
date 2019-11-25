import React from "react";
import { generatePath } from "react-router";
import get from "lodash/get";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { useStyles } from "./styled";

export const SearchApplicationList = ({ currentApplications }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {currentApplications.length && (
        <>
          <div className={classes.applicationRow}>
            <div>
              <div className={classes.heading}>Applicant&apos;s Detail</div>
            </div>
            <div>
              <div className={classes.heading}>Company Detail</div>
            </div>
            <div>
              <div className={classes.heading}>Status</div>
            </div>
          </div>
          {currentApplications.map(application => (
            <Link
              className={classes.applicationRow}
              key={application.prospectId}
              to={generatePath(routes.SearchedAppInfo, { id: application.prospectId })}
            >
              <div>
                <div className={classes.fullName}>
                  {get(application, "applicantInfo.fullName", "")}
                </div>
                <div className={classes.account}>{get(application, "applicantInfo.email", "")}</div>
                <span className={classes.account}>
                  {`${get(application, "applicantInfo.countryCode", "")} ${get(
                    application,
                    "applicantInfo.mobileNo",
                    ""
                  )}`}
                </span>
                <span className={classes.account}>
                  <br />
                  {`Lead No. - ${get(application, "organizationInfo.leadNumber", "")}`}
                </span>
              </div>
              <div>
                <div className={classes.companyName}>
                  {get(application, "organizationInfo.companyName", "")}
                </div>
                <div className={classes.account}>
                  {`TL No. - ${get(application, "organizationInfo.licenseNumber", "")}`}
                </div>
              </div>
              <div>
                <div className={classes.status}>{get(application, "status.statusType", "")}</div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

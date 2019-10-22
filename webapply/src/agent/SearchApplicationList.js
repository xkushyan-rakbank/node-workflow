import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import routes from "../routes";

const style = {
  wrapper: {
    marginTop: "24px",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff"
  },
  applicationRow: {
    borderBottom: "1px solid #e6e6e6",
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1fr",
    alignItems: "center",
    padding: "24px 20px 19px 30px"
  },
  fullName: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "18px",
    color: "#263d4c",
    height: "18px"
  },
  companyName: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1,
    color: "#263d4c",
    marginTop: "-23px"
  },
  account: {
    fontSize: "14px",
    color: "#86868b",
    marginTop: 5,
    height: "18px"
  },
  status: {
    borderRadius: "4px",
    backgroundColor: "#e9e9ed",
    fontSize: "14px",
    color: "#373737",
    padding: "3px 5px"
  },
  action: {
    fontSize: "14px",
    fontStyle: "italic",
    lineHeight: 1.14,
    textAlign: "center",
    color: "#b5b5bb"
  },
  heading: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "18px",
    color: "#263d4c",
    height: "18px"
  }
};

const SearchApplicationList = ({ classes, currentApplications }) => {
  return (
    <div className={classes.wrapper}>
      {currentApplications.length > 0 && (
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
      )}
      {currentApplications.length > 0 &&
        currentApplications.map((application, index) => (
          <Link
            className={classes.applicationRow}
            key={index}
            to={`${routes.SearchedAppInfo.replace(":id", application.prospectId)}`}
          >
            <div>
              <div className={classes.fullName}>
                {application.applicantInfo.fullName && application.applicantInfo.fullName}
              </div>
              <div className={classes.account}>
                {application.applicantInfo.email && application.applicantInfo.email}
              </div>
              <span className={classes.account}>
                {application.applicantInfo.mobileNo &&
                  application.applicantInfo.countryCode + " " + application.applicantInfo.mobileNo}
              </span>
            </div>
            <div>
              <div className={classes.companyName}>
                {application.organizationInfo.companyName &&
                  application.organizationInfo.companyName}
              </div>
              <div className={classes.account}>
                {application.organizationInfo.licenseNumber &&
                  application.organizationInfo.licenseNumber}
              </div>
            </div>
            <div>
              <span className={classes.status}>
                {application.status.statusType && application.status.statusType}
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default withStyles(style)(SearchApplicationList);

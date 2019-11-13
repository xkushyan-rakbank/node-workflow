import React from "react";
import get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { styles } from "./styled";
import { titles } from "./constants";

const SearchApplicationList = ({ classes, currentApplications }) => {
  return (
    <div className={classes.wrapper}>
      {currentApplications.length && (
        <>
          <div className={classes.applicationRow}>
            <div>
              <div className={classes.heading}>{titles.APPLICANT_DETAIL_TITLE}</div>
            </div>
            <div>
              <div className={classes.heading}>{titles.COMPANY_DETAIL_TITLE}</div>
            </div>
            <div>
              <div className={classes.heading}>{titles.STATUS_TITLE}</div>
            </div>
          </div>
          {currentApplications.map((application, index) => (
            <Link
              className={classes.applicationRow}
              key={index}
              to={`${routes.SearchedAppInfo.replace(":id", application.prospectId)}`}
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

export default withStyles(styles)(SearchApplicationList);

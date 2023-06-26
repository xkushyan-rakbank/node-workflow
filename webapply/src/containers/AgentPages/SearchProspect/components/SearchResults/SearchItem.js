import React from "react";
import { generatePath } from "react-router";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import cx from "classnames";

import routes from "../../../../../routes";
import { BAU_PROSPECT_VERSION } from "../../../../../constants";
import { useStyles } from "./styled";

import { getAppConfig } from "../../../../../store/selectors/appConfig";
import { getLoginResponse } from "../../../../../store/selectors/loginSelector";

export const SearchItem = ({ application }) => {
  const classes = useStyles();
  const history = useHistory();
  const { authorizationToken } = useSelector(getAppConfig);
  const { agentName, agentId, agentRole, deptName, roCode } = useSelector(getLoginResponse);
  const prospectVersion = application.prospectVersion ? application.prospectVersion : "";

  function redirectToExternalURL(externalURL) {
    const data = {
      agentName,
      agentId,
      agentRole,
      deptName,
      roCode,
      prospectId: application?.prospectId,
      authToken: authorizationToken,
      fullName: application.applicantInfo?.fullName
    };

    const params = new URLSearchParams();

    for (const key in data) {
      params.append(key, data[key]);
    }

    const encodedQuery = params.toString();
    const url = `${externalURL}?${encodedQuery}`;
    window.location.href = url;
  }

  const handleNavigation = () => {
    return prospectVersion === BAU_PROSPECT_VERSION
      ? redirectToExternalURL(process.env.REACT_APP_BAU_URL + "/business/application-redirect")
      : history.push(generatePath(routes.SearchedAppInfo, { id: application?.prospectId }));
  };

  return (
    <div className={cx(classes.applicationRow)} onClick={handleNavigation}>
      <div className={classes.column}>
        <div className={classes.fullName}>{application.applicantInfo?.fullName}</div>
        <div className={classes.account}>{application.applicantInfo?.email}</div>
        <span className={classes.account}>
          {`${application.applicantInfo?.countryCode || ""} ${application.applicantInfo?.mobileNo ||
            ""}`}
        </span>
        <span className={classes.account}>
          <br />
          {`Lead No. - ${application.organizationInfo?.leadNumber || ""}`}
        </span>
      </div>
      <div className={classes.column}>
        <div className={classes.companyName}>{application.organizationInfo?.companyName}</div>
        <div className={classes.account}>
          {`TL No. - ${application.organizationInfo?.licenseNumber || ""}`}
        </div>
      </div>
      <div className={classes.column}>
        {application.status ? (
          <div className={classes.status}>{application.status?.statusNotes}</div>
        ) : (
          <div className={classes.status}>Incomplete</div>
        )}
      </div>
    </div>
  );
};

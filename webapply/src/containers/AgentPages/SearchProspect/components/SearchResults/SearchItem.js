/* eslint-disable max-len */
import React from "react";
import { generatePath } from "react-router";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { get } from "lodash";

import routes from "../../../../../routes";
import { BAU_PROSPECT_VERSION } from "../../../../../constants";
import { useStyles } from "./styled";

import { getAppConfig } from "../../../../../store/selectors/appConfig";
import { getLoginResponse } from "../../../../../store/selectors/loginSelector";
import StakeholdersDetail from "../../../../CompanyStakeholders/components/CompanyStakeholders/StakeholdersDetail";
import { SubmitButton } from "../../../../../components/Buttons/SubmitButton";
import { ctaStatusClass, custActions, roActions } from "../../../../MyApplications/constants";
import { STATUS_LOCKED } from "../../../SearchedAppInfo/constants";
import { getProspectInfoPromisify } from "../../../../../store/actions/retrieveApplicantInfo";
import { useDisplayScreenBasedOnViewId } from "../../../../../utils/useDisplayScreenBasedOnViewId";
import { getDocumentsList } from "../../../../../store/actions/uploadDocuments";

export const SearchItem = ({ application, key, getProspectInfo, loadingProspectId }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { authorizationToken } = useSelector(getAppConfig);
  const { agentName, agentId, agentRole, deptName, roCode } = useSelector(getLoginResponse);
  const prospectVersion = application.prospectVersion ? application.prospectVersion : "";
  const { pushDisplayScreenToHistory } = useDisplayScreenBasedOnViewId();

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
    if (application?.status?.statusType === "INFO_REQUIRED") {
      dispatch(getProspectInfoPromisify(application.prospectId)).then(
        prospect => {
          dispatch(getDocumentsList());
          pushDisplayScreenToHistory(prospect);
        },
        () => {}
      );
      return;
    }
    if (getProspectInfo) {
      return getProspectInfo(application.prospectId, application);
    }
    return prospectVersion === BAU_PROSPECT_VERSION
      ? redirectToExternalURL(process.env.REACT_APP_BAU_URL + "/business/application-redirect")
      : history.push(generatePath(routes.SearchedAppInfo, { id: application?.prospectId }));
  };

  const declineRoReason =
    get(application, "notifyApplicationRequest.declineReasonDetailsFromBPM[0].declineROMessage") ||
    "-";

  const declineCustReason =
    get(
      application,
      "notifyApplicationRequest.declineReasonDetailsFromBPM[0].declineCustMessage"
    ) || "-";

  const declineRemarks =
    get(application, "notifyApplicationRequest.declineReasonDetailsFromBPM[0].declineRemarks") ||
    "-";

  return (
    <div key={key} className={classes.searchItemCard}>
      <div className={classes.searchItemStatus}>
        <StakeholdersDetail
          name={application.applicantInfo?.fullName}
          className={classes.preview}
          isStakeholder={false}
          referenceNumber={`Reference No. ${application.prospectId}`}
        />
        <div className={classes.statusCont}>
          <span className={classes.label}>Status</span>
          <span
            className={cx(
              classes.statusDiv,
              ctaStatusClass[(application?.status?.statusType)] &&
                classes[ctaStatusClass[(application?.status?.statusType)]]
            )}
          >
            {application?.status?.statusNotes}
          </span>
        </div>
      </div>
      <div className={classes.searchItemDetails}>
        <div className={classes.appDetails}>
          <span className={classes.appDetailsHeader}>Application details</span>
          <span className={classes.appDetailsinfo}>
            {`${application.applicantInfo?.email || ""} \n +${application.applicantInfo
              ?.countryCode || ""}${application.applicantInfo?.mobileNo || ""}`}
          </span>
        </div>
        <div className={classes.appDetails}>
          <span className={classes.appDetailsHeader}>Company details</span>
          <span
            className={classes.appDetailsinfo}
          >{`${application?.organizationInfo?.companyName} \n TL NO. ${application?.organizationInfo?.licenseNumber}`}</span>
        </div>
        <div className={cx(classes.appDetails, classes.reason)}>
          <span className={classes.appDetailsHeader}>Reason</span>
          <span className={classes.appDetailsinfo}>
            {agentId ? declineRoReason : declineCustReason}
          </span>
        </div>
      </div>
      <div className={cx(classes.appDetails, classes.remarks)}>
        <span className={classes.appDetailsHeader}>Remarks</span>
        <span className={classes.appDetailsinfo}>{declineRemarks}</span>
      </div>
      {agentId && roActions[(application?.status?.statusType)] && (
        <>
          <div className={classes.lineBreak}></div>
          <div className={classes.footer}>
            <SubmitButton
              justify="flex-end"
              label={roActions[(application?.status?.statusType)].buttonText}
              type="button"
              submitButtonClassName={classes.button}
              onClick={handleNavigation}
              disabled={application?.status?.reasonCode === STATUS_LOCKED}
              isDisplayLoader={loadingProspectId === application.prospectId}
              isSearchApplicant
            />
          </div>
        </>
      )}
      {!agentId && custActions[(application?.status?.statusType)] && (
        <>
          <div className={classes.lineBreak}></div>
          <div className={classes.footer}>
            <SubmitButton
              justify="flex-end"
              label={custActions[(application?.status?.statusType)].buttonText}
              type="button"
              submitButtonClassName={classes.button}
              onClick={handleNavigation}
              disabled={application?.status?.reasonCode === STATUS_LOCKED}
              isDisplayLoader={loadingProspectId === application.prospectId}
              isSearchApplicant
            />
          </div>
        </>
      )}
    </div>
  );
};

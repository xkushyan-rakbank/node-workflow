import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { WebToMobileComponent } from "./components/WebToMobileComponent";
import routes from "../../routes";
import { createSyncSession } from "../../store/actions/webToMobile";
import { getwtmSessionDetails } from "../../store/selectors/webToMobile";
import { log } from "../../utils/loggger";
import { getProspectId } from "../../store/selectors/appConfig";

const SESSION_TYPES = {
  STAKEHOLDER_KYC: "STAKEHOLDER_KYC"
};

export const WebToMobilePage = ({ getKycStatus }) => {
  useFormNavigation([false, false]);

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const prospectId = useSelector(getProspectId);

  const searchParams = new URLSearchParams(location.search);
  const tempToken = searchParams.get("tt");

  const { sessionData } = useSelector(getwtmSessionDetails);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    tempToken && dispatch(createSyncSession(tempToken));
  }, [tempToken]);

  // authenticate then load the documents and redirect to stakeholderpage
  useEffect(() => {
    if (sessionData.sessionType === SESSION_TYPES.STAKEHOLDER_KYC && prospectId) {
      getKycStatus()
        .then(() => {
          setIsLoading(false);
          history.push(routes.stakeholdersInfo);
        })
        .catch(error => {
          log(error);
        });
    }
  }, [sessionData, prospectId]);

  return <WebToMobileComponent loading={isLoading} />;
};

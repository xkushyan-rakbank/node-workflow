import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { WebToMobileComponent } from "./components/WebToMobileComponent";
import routes from "../../routes";
import { createSyncSession } from "../../store/actions/webToMobile";
import { getwtmSessionDetails } from "../../store/selectors/webToMobile";

const SESSION_TYPES = {
  STAKEHOLDER_KYC: "STAKEHOLDER_KYC"
};

export const WebToMobilePage = () => {
  useFormNavigation([false, false]);

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);
  const tempToken = searchParams.get("tt");

  const { sessionData } = useSelector(getwtmSessionDetails);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    tempToken && dispatch(createSyncSession(tempToken));
  }, [tempToken]);

  useEffect(() => {
    if (sessionData.sessionType === SESSION_TYPES.STAKEHOLDER_KYC) {
      setIsLoading(false);
      history.push(routes.stakeholdersInfo);
    }
  }, [sessionData]);

  return <WebToMobileComponent loading={isLoading} />;
};

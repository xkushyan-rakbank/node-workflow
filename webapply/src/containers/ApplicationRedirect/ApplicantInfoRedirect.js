import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { ApplicationRedirectComponent } from "./components/ApplicationRedirectComponent";
import { updateProspect } from "../../store/actions/appConfig";
import routes from "../../routes";

const ApplicationRedirectPage = () => {
  useFormNavigation([false, false]);

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory()

  const searchParams = new URLSearchParams(location.search);

  const decodedData = {};

  for (const [key, value] of searchParams.entries()) {
    decodedData[key] = decodeURIComponent(value);
  }

  const { islamicBanking, accountType } = decodedData;

  useEffect(() => {
    if (accountType && islamicBanking) {
      dispatch(
        updateProspect({
          "prospect.applicationInfo.islamicBanking": JSON.parse(islamicBanking),
          "prospect.applicationInfo.accountType": accountType
        })
      );
      setIsLoading(false);
      history.push(routes.applicantInfo);
    }
  }, [islamicBanking, accountType]);

  const [isLoading, setIsLoading] = useState(true);

  return <ApplicationRedirectComponent loading={isLoading} />;
};

export default ApplicationRedirectPage;

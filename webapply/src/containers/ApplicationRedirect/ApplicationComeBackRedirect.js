import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { ApplicationRedirectComponent } from "./components/ApplicationRedirectComponent";
import { setAccessToken, updateProspect } from "../../store/actions/appConfig";
import { getProspectInfoPromisify } from "../../store/actions/retrieveApplicantInfo";
import { useDisplayScreenBasedOnViewId } from "../../utils/useDisplayScreenBasedOnViewId";
import { getProspectId } from "../../store/selectors/appConfig";

const ApplicationRedirectPage = () => {
  useFormNavigation([false, false]);

  const location = useLocation();
  const dispatch = useDispatch();
  const { pushDisplayScreenToHistory } = useDisplayScreenBasedOnViewId();

  const searchParams = new URLSearchParams(location.search);

  const decodedData = {};

  for (const [key, value] of searchParams.entries()) {
    decodedData[key] = decodeURIComponent(value);
  }

  const { prospectId, authToken } = decodedData;

  const prospectIdFromStore = useSelector(getProspectId);

  useEffect(() => {
    if (prospectIdFromStore) {
      setIsLoading(false);
      dispatch(getProspectInfoPromisify(prospectId)).then(
        prospect => pushDisplayScreenToHistory(prospect),
        () => {}
      );
    }
  }, [prospectIdFromStore]);
  useEffect(() => {
    if (prospectId && authToken) {
      dispatch(setAccessToken(authToken));
      dispatch(
        updateProspect({
          "prospect.generalInfo.prospectId": prospectId
        })
      );
    }
  }, [prospectId, authToken]);

  const [isLoading, setIsLoading] = useState(true);

  return <ApplicationRedirectComponent loading={isLoading} />;
};

export default ApplicationRedirectPage;

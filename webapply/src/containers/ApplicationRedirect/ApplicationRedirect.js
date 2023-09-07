import React, { useState, useEffect } from "react";
import { generatePath, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { ApplicationRedirectComponent } from "./components/ApplicationRedirectComponent";
import { setAccessToken, updateProspect } from "../../store/actions/appConfig";
import routes from "../../routes";
import { getProspectId } from "../../store/selectors/appConfig";
import { loginInfoFormSuccess } from "../../store/actions/loginForm";

export const ApplicationRedirectPage = ({ setIsApplyEditApplication }) => {
  useFormNavigation([false, false]);

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);

  const decodedData = {};

  for (const [key, value] of searchParams.entries()) {
    decodedData[key] = decodeURIComponent(value);
  }

  const {
    prospectId,
    authToken,
    agentName,
    agentId,
    agentRole,
    deptName,
    roCode,
    fullName
  } = decodedData;

  const prospectIdFromStore = useSelector(getProspectId);

  useEffect(() => {
    if (prospectIdFromStore) {
      setIsLoading(false);
      history.push({
        pathname: generatePath(routes.SearchedAppInfo, {
          id: prospectIdFromStore
        }),
        state: { fullName, isFromV2: true }
      });
    }
  }, [prospectIdFromStore]);

  useEffect(() => {
    if (prospectId && authToken && agentName) {
      dispatch(setAccessToken(authToken));
      dispatch(loginInfoFormSuccess({ agentName, agentId, agentRole, deptName, roCode }));
      setIsApplyEditApplication(true);
      dispatch(
        updateProspect({
          "prospect.generalInfo.prospectId": prospectId,
          "login.userName": agentId
        })
      );
    }
  }, [prospectId, authToken]);

  const [isLoading, setIsLoading] = useState(true);

  return <ApplicationRedirectComponent loading={isLoading} />;
};

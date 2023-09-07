import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { getAppConfig, getSearchInputDetails } from "../../../../../store/selectors/appConfig";
import { getLoginResponse } from "../../../../../store/selectors/loginSelector";
import routes from "../../../../../routes";
import { loginInfoFormSuccess } from "../../../../../store/actions/loginForm";
import { setAccessToken, updateProspect } from "../../../../../store/actions/appConfig";
import { OverlayLoader } from "../../../../../components/Loader";

export default function SearchItemRedirect() {
  const { authorizationToken } = useSelector(getAppConfig);
  const { agentName, agentId, agentRole, deptName, roCode } = useSelector(getLoginResponse);
  const searchInfo = useSelector(getSearchInputDetails);

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location?.search);
  const flow = searchParams.get("flow");

  const application = location?.state?.application;

  function redirectToExternalURL(externalURL) {
    const data = {
      agentName,
      agentId,
      agentRole,
      deptName,
      roCode,
      prospectId: application?.prospectId,
      authToken: authorizationToken,
      fullName: application?.applicantInfo?.fullName
    };

    const params = new URLSearchParams();

    for (const key in data) {
      params.append(key, data[key]);
    }

    const encodedQuery = params.toString();
    const url = `${externalURL}?${encodedQuery}`;
    let stateData = {
      application,
      agentName,
      agentId,
      agentRole,
      deptName,
      roCode,
      authorizationToken,
      searchInfo
    };
    localStorage.setItem("agentDetails", JSON.stringify(stateData));
    window.history.pushState(
      stateData,
      "Intermediate State",
      `${window.location.origin + window.location.pathname}?flow=backward`
    );
    window.location.href = url;
  }

  useEffect(() => {
    if (flow === "forward" && application) {
      redirectToExternalURL(process.env.REACT_APP_BAU_URL + "/business/application-redirect");
    } else if (flow === "backward") {
      const stateData = JSON.parse(localStorage.getItem("agentDetails"));
      const {
        agentName,
        agentId,
        agentRole,
        deptName,
        roCode,
        authorizationToken,
        searchInfo
      } = stateData;
      const loginObj = { agentName, agentId, agentRole, deptName, roCode };
      dispatch(loginInfoFormSuccess(loginObj));
      dispatch(setAccessToken(authorizationToken));
      dispatch(updateProspect({ searchInfo }));
    }
  }, []);

  useEffect(() => {
    if (flow === "backward") {
      localStorage.removeItem("agentDetails");
      history.push(routes.searchProspect);
    }
  }, [authorizationToken]);

  return <OverlayLoader text={"Loading"} open={true} />;
}

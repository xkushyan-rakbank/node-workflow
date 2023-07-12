import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MyApplications as BaseComponent } from "./components/MyApplications";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { searchApplications } from "../../store/actions/searchProspect";
import { getProspectInfoPromisify } from "./../../store/actions/retrieveApplicantInfo";
import { getAppConfig, getApplicantInfo } from "../../store/selectors/appConfig";
import {
  getIsLoadingSearchProspects,
  getSearchResults
} from "../../store/selectors/searchProspect";
import { getLoadingProspectId } from "../../store/selectors/retrieveApplicantInfo";
import { useDisplayScreenBasedOnViewId } from "../../utils/useDisplayScreenBasedOnViewId";
import { BAU_PROSPECT_VERSION, searchProspectStepper } from "../../constants";
import { receiveAppConfig } from "../../store/actions/appConfig";
import { getDocumentsList } from "../../store/actions/uploadDocuments";

export const MyApplications = () => {
  const inputParam = useSelector(getApplicantInfo);
  const isLoading = useSelector(getIsLoadingSearchProspects);
  const searchResults = useSelector(getSearchResults);
  const loadingProspectId = useSelector(getLoadingProspectId);
  const { authorizationToken } = useSelector(getAppConfig);
  const dispatch = useDispatch();
  const { pushDisplayScreenToHistory } = useDisplayScreenBasedOnViewId();
  useFormNavigation([true, false, searchProspectStepper]);

  useEffect(() => {
    dispatch(searchApplications(inputParam));
    dispatch(receiveAppConfig());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function redirectToExternalURL(externalURL, application) {
    const data = {
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

  const onGetProspectInfo = useCallback(
    (prospectId, application) => {
      if (application.prospectVersion === BAU_PROSPECT_VERSION) {
        redirectToExternalURL(
          process.env.REACT_APP_BAU_URL + "/business/application-comeback-redirect",
          application
        );
      } else {
        dispatch(getProspectInfoPromisify(prospectId)).then(
          prospect => {
            dispatch(getDocumentsList());
            if (prospect.viewId === "/StakeholdersInfo") {
              prospect.viewId = "/StakeholdersInfoPreview";
            }
            pushDisplayScreenToHistory(prospect);
          },
          () => {}
        );
      }
    },

    [pushDisplayScreenToHistory, dispatch]
  );

  return (
    <BaseComponent
      getProspectInfo={onGetProspectInfo}
      isLoading={isLoading}
      searchResults={searchResults}
      loadingProspectId={loadingProspectId}
    />
  );
};

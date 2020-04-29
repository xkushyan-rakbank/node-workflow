import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MyApplications as BaseComponent } from "./components/MyApplications";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { searchApplications } from "../../store/actions/searchProspect";
import { getProspectInfoPromisify } from "./../../store/actions/retrieveApplicantInfo";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import {
  getIsLoadingSearchProspects,
  getSearchResults
} from "../../store/selectors/searchProspect";
import { getLoadingProspectId } from "../../store/selectors/retrieveApplicantInfo";
import { useDisplayScreenBasedOnViewId } from "../../utils/useDisplayScreenBasedOnViewId";
import { searchProspectStepper } from "../../constants";

export const MyApplications = () => {
  const inputParam = useSelector(getApplicantInfo);
  const isLoading = useSelector(getIsLoadingSearchProspects);
  const searchResults = useSelector(getSearchResults);
  const loadingProspectId = useSelector(getLoadingProspectId);
  const dispatch = useDispatch();
  const { pushDisplayScreenToHistory } = useDisplayScreenBasedOnViewId();
  useFormNavigation([true, false, searchProspectStepper]);

  useEffect(() => {
    dispatch(searchApplications(inputParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetProspectInfo = useCallback(
    prospectId =>
      dispatch(getProspectInfoPromisify(prospectId)).then(
        prospect => pushDisplayScreenToHistory(prospect),
        () => {}
      ),
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

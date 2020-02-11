import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { searchApplications } from "../../store/actions/searchProspect";
import { getProspectInfoPromisify } from "./../../store/actions/retrieveApplicantInfo";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import { getSearchResult } from "./../../store/selectors/searchProspect";

import { MyApplications as BaseComponent } from "./components/MyApplications";
import { useDisplayScreenBasedOnViewId } from "../../utils/useDisplayScreenBasedOnViewId";

export const MyApplications = () => {
  const searchResults = useSelector(getSearchResult);
  const inputParam = useSelector(getApplicantInfo);
  const dispatch = useDispatch();
  const { pushDisplayScreenToHistory } = useDisplayScreenBasedOnViewId();

  useEffect(() => {
    dispatch(searchApplications(inputParam));
  }, [inputParam, dispatch]);

  const onGetProspectInfo = useCallback(
    prospectId =>
      dispatch(getProspectInfoPromisify(prospectId)).then(pushDisplayScreenToHistory, () => {}),
    [pushDisplayScreenToHistory]
  );

  return <BaseComponent searchResults={searchResults} getProspectInfo={onGetProspectInfo} />;
};

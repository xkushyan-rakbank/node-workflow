import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { searchApplications } from "../../store/actions/searchProspect";
import { getProspectInfo } from "./../../store/actions/retrieveApplicantInfo";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import { displayScreenBasedOnViewId } from "../../store/actions/appConfig";
import { getSearchResult } from "./../../store/selectors/searchProspect";

import { MyApplications as BaseComponent } from "./components/MyApplications";

export const MyApplications = () => {
  const searchResults = useSelector(getSearchResult);
  const inputParam = useSelector(getApplicantInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchApplications(inputParam));
  }, [inputParam, dispatch]);

  return (
    <BaseComponent
      searchResults={searchResults}
      getProspectInfo={prospectId => dispatch(getProspectInfo(prospectId))}
      displayScreenBasedOnViewId={() => dispatch(displayScreenBasedOnViewId())}
    />
  );
};

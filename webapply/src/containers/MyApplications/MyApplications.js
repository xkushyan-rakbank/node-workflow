import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { searchApplications } from "../../store/actions/searchProspect";
import { getProspectInfoPromisify } from "./../../store/actions/retrieveApplicantInfo";
import { getApplicantInfo } from "../../store/selectors/appConfig";

import { MyApplications as BaseComponent } from "./components/MyApplications";
import { useDisplayScreenBasedOnViewId } from "../../utils/useDisplayScreenBasedOnViewId";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";

export const MyApplications = () => {
  const inputParam = useSelector(getApplicantInfo);
  const dispatch = useDispatch();
  const { pushDisplayScreenToHistory } = useDisplayScreenBasedOnViewId();
  useFormNavigation([true, false]);

  useEffect(() => {
    dispatch(searchApplications(inputParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetProspectInfo = useCallback(
    prospectId => {
      dispatch(getProspectInfoPromisify(prospectId)).then(
        prospect => pushDisplayScreenToHistory(prospect),
        () => {}
      );
    },
    [pushDisplayScreenToHistory, dispatch]
  );

  return <BaseComponent getProspectInfo={onGetProspectInfo} />;
};

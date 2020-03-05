import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { searchApplications } from "../../store/actions/searchProspect";
import { getProspectInfoPromisify } from "./../../store/actions/retrieveApplicantInfo";
import { getProspectStatus } from "./../../store/selectors/searchProspect";
import { getApplicantInfo } from "../../store/selectors/appConfig";

import { MyApplications as BaseComponent } from "./components/MyApplications";
import { useDisplayScreenBasedOnViewId } from "../../utils/useDisplayScreenBasedOnViewId";

export const MyApplications = () => {
  const inputParam = useSelector(getApplicantInfo);
  const status = useSelector(getProspectStatus);
  const dispatch = useDispatch();
  const { pushDisplayScreenToHistory } = useDisplayScreenBasedOnViewId();

  useEffect(() => {
    dispatch(searchApplications(inputParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status) {
      pushDisplayScreenToHistory();
    }
  }, [status]);

  const onGetProspectInfo = useCallback(
    prospectId => {
      dispatch(getProspectInfoPromisify(prospectId));
    },
    [pushDisplayScreenToHistory, dispatch]
  );

  const onGetProspectInfoWithoutStatus = useCallback(
    prospectId =>
      dispatch(getProspectInfoPromisify(prospectId)).then(pushDisplayScreenToHistory, () => {}),
    [pushDisplayScreenToHistory, dispatch]
  );

  return (
    <BaseComponent
      getProspectInfo={onGetProspectInfo}
      getProspectInfoWithoutStatus={onGetProspectInfoWithoutStatus}
    />
  );
};

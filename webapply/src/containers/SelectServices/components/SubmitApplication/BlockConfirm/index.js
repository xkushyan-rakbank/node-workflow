import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BlockConfirmComponent } from "./BlockConfirm";
import { getIsIslamicBanking } from "../../../../../store/selectors/appConfig";
import { setLinksCondition } from "../../../../../store/actions/appConfig";

export const BlockConfirm = rest => {
  const isIslamicBanking = useSelector(getIsIslamicBanking);
  const dispatch = useDispatch();

  const setIsVisitedLink = useCallback(condition => dispatch(setLinksCondition(condition)), [
    setLinksCondition,
    dispatch
  ]);

  return (
    <BlockConfirmComponent
      isIslamicBanking={isIslamicBanking}
      setIsVisitedLink={setIsVisitedLink}
      {...rest}
    />
  );
};

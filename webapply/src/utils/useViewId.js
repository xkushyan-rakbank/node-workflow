import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { updateViewId } from "../store/actions/appConfig";
import { smeBaseName } from "../routes";

export const useViewId = (isSendToApi = false) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(updateViewId(pathname.replace(smeBaseName, ""), isSendToApi));
  }, [dispatch, pathname, isSendToApi]);
};

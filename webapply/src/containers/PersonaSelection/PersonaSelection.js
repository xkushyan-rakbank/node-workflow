import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { useLayoutParams } from "../FormLayout";
import PersonaSelectionComponent from "./components/PersonaSelectionComponent";

export const PersonaSelection = () => {
  const queryParams = useLocation().search;
  const pushHistory = useTrackingHistory();

  useFormNavigation([true, false]);
  useLayoutParams(false, false, true);

  const goto = useCallback(
    url => {
      if (queryParams) {
        pushHistory(url + queryParams);
      } else {
        pushHistory(url);
      }
    },
    [pushHistory]
  );

  const goToBau = url => {
    if (queryParams) {
      window.location.href = url + queryParams;
    } else {
      window.location.href = url;
    }
  };

  const onSelectPersona = (url, type) => {
    if (type === "bau") {
      goToBau(url);
    } else {
      goto(url);
    }
  };

  return <PersonaSelectionComponent handleNavigation={onSelectPersona} />;
};

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { updateProspect } from "../../store/actions/appConfig";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { useLayoutParams } from "../FormLayout";
import PersonaSelectionComponent from "./components/PersonaSelectionComponent";
import { Personas } from "../../constants";
import useRedirectionUrl from "../../utils/useRedirectionUrl";

export const PersonaSelection = ({ datalist }) => {
  const queryParams = useLocation().search;
  const pushHistory = useTrackingHistory();
  const { redirectToExternalURL } = useRedirectionUrl();

  useFormNavigation([true, false]);
  useLayoutParams(false, false, true);

  const [filteredPersonas, setFilteredPersonas] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const filteredData = datalist?.personas
      ?.map(item => Personas[item.code])
      .sort((i1, i2) => i1.order - i2.order);
    setFilteredPersonas(filteredData);
  }, [datalist]);

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

  function redirectToUrl(externalURL) {
    const url = redirectToExternalURL(externalURL);
    window.location.href = url;
  }

  const onSelectPersona = ({ url, key }, type) => {
    dispatch(
      updateProspect({
        "prospect.applicantInfo.persona": key
      })
    );
    if (type === "bau") {
      redirectToUrl(process.env.REACT_APP_BAU_URL + "/business/applicantinfo-redirect");
    } else {
      goto(url);
    }
  };

  return (
    <PersonaSelectionComponent handleNavigation={onSelectPersona} personas={filteredPersonas} />
  );
};

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import routes from "../../routes";
import { updateProspect } from "../../store/actions/appConfig";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { useLayoutParams } from "../FormLayout";
import PersonaSelectionComponent from "./components/PersonaSelectionComponent";

const Personas = {
  SOLE: {
    key: "SOLE",
    title: "I’m a sole proprietor",
    subTitle: "I own this business",
    url: routes.applicantInfo,
    urlType: "2.0",
    order: 1
  },
  SLLC: {
    key: "SLLC",
    title: "I am sole proprietor with an LLC",
    subTitle: "I do business as a limited liability company (LLC)",
    url: routes.applicantInfo,
    urlType: "2.0",
    order: 2
  },
  NOTA: {
    key: "NOTA",
    title: "None of the above",
    subTitle:
      "I'm a partner in the business, have Power of Attorney, or am applying on behalf of someone else.",
    url: process.env.REACT_APP_BAU_URL || "/",
    urlType: "bau",
    order: 3
  }
};

export const PersonaSelection = ({ datalist }) => {
  const queryParams = useLocation().search;
  const pushHistory = useTrackingHistory();

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

  const goToBau = url => {
    if (queryParams) {
      window.location.href = url + queryParams;
    } else {
      window.location.href = url;
    }
  };

  const onSelectPersona = ({ url, key }, type) => {
    dispatch(
      updateProspect({
        "prospect.applicantInfo.persona": key
      })
    );
    if (type === "bau") {
      goToBau(url);
    } else {
      goto(url);
    }
  };

  return (
    <PersonaSelectionComponent handleNavigation={onSelectPersona} personas={filteredPersonas} />
  );
};

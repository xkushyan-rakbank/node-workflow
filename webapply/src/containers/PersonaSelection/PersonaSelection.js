import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import routes from "../../routes";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { useLayoutParams } from "../FormLayout";
import PersonaSelectionComponent from "./components/PersonaSelectionComponent";

const Personas = {
  SOLE: {
    key: "SOLE",
    title: "I’m a Sole Proprietor",
    subTitle: "I own this business",
    url: routes.applicantInfo,
    urlType: "2.0"
  },
  SLLC: {
    key: "SLLC",
    title: "I’m a Sole Proprietor with an LLC",
    subTitle: "I do business as a limited liability company (LLC)",
    url: routes.applicantInfo,
    urlType: "2.0"
  },
  NOTA: {
    key: "NOTA",
    title: "None of the above",
    subTitle:
      "I'm a partner in the business, have Power of Attorney, or am applying on behalf of someone else.",
    url: process.env.REACT_APP_BAU_URL || "/",
    urlType: "bau"
  }
};

export const PersonaSelection = ({ datalist }) => {
  const queryParams = useLocation().search;
  const pushHistory = useTrackingHistory();

  useFormNavigation([true, false]);
  useLayoutParams(false, false, true);

  const [filteredPersonas, setFilteredPersonas] = useState();

  useEffect(() => {
    const filteredData = datalist?.personas?.map(item => Personas[item.code]);
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

  const onSelectPersona = (url, type) => {
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

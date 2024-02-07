import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { updateProspect } from "../../store/actions/appConfig";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { useLayoutParams } from "../FormLayout";
import PersonaSelectionComponent from "./components/PersonaSelectionComponentNew";
import { Personas } from "../../constants";
import useRedirectionUrl from "../../utils/useRedirectionUrl";
import { Footer } from "../../components/Footer";
import { BackLink } from "../../components/Buttons/BackLink";
import routes, { smeBaseName } from "../../routes";
import { getIsIslamicBanking } from "../../store/selectors/appConfig";

export const PersonaSelection = ({ datalist }) => {
  const queryParams = useLocation().search;
  const pushHistory = useTrackingHistory();
  const { redirectToExternalURL } = useRedirectionUrl();
  const islamicBanking = useSelector(getIsIslamicBanking);

  useFormNavigation([true, false]);
  useLayoutParams(false, false, true);

  const [filteredPersonas, setFilteredPersonas] = useState();

  const dispatch = useDispatch();
  const { accountType } = useParams();

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
    const shouldRedirect = islamicBanking === null || islamicBanking === undefined;
    if (shouldRedirect) {
      pushHistory(routes.quickapplyLanding);
      return;
    }

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
    <>
      <PersonaSelectionComponent handleNavigation={onSelectPersona} personas={filteredPersonas} />
      <Footer extraClasses={"oneElement"}>
        <BackLink
          path={`${smeBaseName}/accounts/${accountType}/application-overview`}
          isTypeButton={true}
        />
      </Footer>
    </>
  );
};

import React, { useContext } from "react";

import { VerticalPaginationContext } from "../../components/VerticalPagination";
import { useLayoutParams, useLogoType } from "../FormLayout";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { QuickapplyLandingComponent } from "./components/QuickapplyLanding/index";
import { LOGO_STANDART } from "../../components/Header/constants";

export const QuickapplyLandingContainer = () => {
  const { setCurrentSection, currentSectionIndex } = useContext(VerticalPaginationContext);
  useFormNavigation([true, false, [], !!currentSectionIndex]);
  useLayoutParams(false, false, true);
  useLogoType(LOGO_STANDART);

  return <QuickapplyLandingComponent setCurrentSection={setCurrentSection} />;
};

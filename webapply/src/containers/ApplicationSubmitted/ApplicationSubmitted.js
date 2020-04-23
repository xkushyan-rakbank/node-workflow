import React from "react";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { ApplicationSubmittedComponent } from "./components/ApplicationSubmitted";
import { useViewId } from "../../utils/useViewId";
import { formStepper } from "../../constants";

export const ApplicationSubmittedContainer = ({ accountNumbers, companyName }) => {
  useFormNavigation([true, true, formStepper]);
  useViewId();

  return (
    <ApplicationSubmittedComponent accountNumbers={accountNumbers} companyName={companyName} />
  );
};

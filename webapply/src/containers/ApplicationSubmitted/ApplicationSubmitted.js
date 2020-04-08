import React from "react";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { formStepper } from "../../constants";

import { ApplicationSubmittedComponent } from "./components/ApplicationSubmitted";

export const ApplicationSubmittedContainer = ({ accountNumbers, companyName }) => {
  useFormNavigation([true, true, formStepper]);

  return (
    <ApplicationSubmittedComponent accountNumbers={accountNumbers} companyName={companyName} />
  );
};

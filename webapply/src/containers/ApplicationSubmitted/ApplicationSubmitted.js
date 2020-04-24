import React from "react";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { ApplicationSubmittedComponent } from "./components/ApplicationSubmitted";
import { useLayoutParams } from "../FormLayout";
import { useViewId } from "../../utils/useViewId";
import { formStepper } from "../../constants";

export const ApplicationSubmittedContainer = ({ accountNumbers, companyName }) => {
  useFormNavigation([true, true, formStepper]);
  useLayoutParams(true);
  useViewId();

  return (
    <ApplicationSubmittedComponent accountNumbers={accountNumbers} companyName={companyName} />
  );
};

import React from "react";
import AdditionalInfoComponent from "./components/AdditionalInfoComponent";
import { useViewId } from "../../utils/useViewId";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { formStepper } from "../../constants";

export const Additional = () => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  return <AdditionalInfoComponent />;
};

import React from "react";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { formStepper } from "../../constants";
import { FormConfirm } from "./components/FormConfirm";

export const FormConfirmPage = () => {
  useFormNavigation([false, false, formStepper]);
  useLayoutParams(true);

  return <FormConfirm />;
};

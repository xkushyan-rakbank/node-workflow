import React from "react";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { OtpChannel, formStepper } from "../../constants";
import { FormConfirm } from "./components/FormConfirm";

export default function FormEmailConfirmPage() {
  useFormNavigation([false, false, formStepper]);
  useLayoutParams(true);

  return <FormConfirm otpType={OtpChannel.Email} />;
}

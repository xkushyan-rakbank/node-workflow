import React from "react";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { formStepper, OtpChannel } from "../../constants";
import { FormConfirm } from "./components/FormConfirm";

export default function FormConfirmMobilePage() {
  useFormNavigation([false, false, formStepper]);
  useLayoutParams(true);

  return <FormConfirm otpType={OtpChannel.Sms} />;
}

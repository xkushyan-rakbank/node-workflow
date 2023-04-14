import React from "react";
import { useSelector } from "react-redux";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { formStepper, OtpChannel } from "../../constants";
import { FormConfirm } from "./components/FormConfirm";
import { getApplicantInfo } from "../../store/selectors/appConfig";

export default function FormConfirmMobilePage() {
  useFormNavigation([false, false, formStepper]);
  useLayoutParams(true);

  const { mobileNo, countryCode } = useSelector(getApplicantInfo);

  return (
    <FormConfirm
      otpType={OtpChannel.Sms}
      title={"Verify your mobile"}
      // eslint-disable-next-line max-len
      info={`We sent a 6-digit OTP to the number +${countryCode}${mobileNo}. Please enter it below.`}
      changeText={"Change mobile number"}
    />
  );
}

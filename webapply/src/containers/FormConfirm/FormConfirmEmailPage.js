import React from "react";
import { useSelector } from "react-redux";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { OtpChannel, formStepper } from "../../constants";
import { FormConfirm } from "./components/FormConfirm";
import { getApplicantInfo } from "../../store/selectors/appConfig";

export default function FormEmailConfirmPage() {
  useFormNavigation([false, false, formStepper]);
  useLayoutParams(false);

  const applicantInfo = useSelector(getApplicantInfo);

  return (
    <FormConfirm
      otpType={OtpChannel.Email}
      title={"Verify your email"}
      // eslint-disable-next-line quotes
      // eslint-disable-next-line max-len
      info={`We sent a 6-digit OTP to ${applicantInfo.email}. Please enter it below. Don't see the email? Try checking your spam or junk folder.`}
      changeText={"Change email"}
    />
  );
}

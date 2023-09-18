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
  const emailStyle = {
    color: "#5E080B",
    fontWeight: 500,
  };

  return (
    <FormConfirm
      otpType={OtpChannel.Email}
      title={"Let's verify your email address"}
      // eslint-disable-next-line quotes
      // eslint-disable-next-line max-len
      info={
        <span>
          Enter the 6-digit OTP we sent to <span style={emailStyle}>{applicantInfo.email}</span>. If
          you don't see the email in your inbox, try checking your spam or junk folder.
        </span>
      }
      changeText={"Change email"}
    />
  );
}

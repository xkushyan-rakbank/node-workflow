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

  const { mobileNo } = useSelector(getApplicantInfo);
  const suffixNumber = `··· [${mobileNo?.substr(-4)}]`;

  const suffixNumberStyle = {
    color: "#5E080B",
    fontWeight: 500,
  };

  return (
    <FormConfirm
      otpType={OtpChannel.Sms}
      title={"Let's verify your mobile number"}
      // eslint-disable-next-line max-len
      info={
        <span>
          We sent a 6-digit OTP to the number ending in{" "}
          <span style={suffixNumberStyle}>{suffixNumber}</span>. Please enter it below.
        </span>
      }
      changeText={"Change mobile number"}
    />
  );
}

import React from "react";
import { useSelector } from "react-redux";

import { Otp } from "../../Otp";

import { useStyles } from "./../styled";
import { getApplicantInfo } from "../../../store/selectors/appConfig";

export const ComeBackVerificationComponent = ({ redirectRoute, otpType }) => {
  const classes = useStyles();
  const { mobileNo, email, countryCode } = useSelector(getApplicantInfo);

  return (
    <div className={classes.container}>
      <h3 className={classes.heading}>Confirm that it’s you</h3>
      <Otp
        redirectRoute={redirectRoute}
        otpType={otpType}
        title={otpType === "sms" ? "Verify your mobile" : "Verify your email"}
        info={
          otpType === "sms"
            ? `We sent a 6-digit OTP to the number +${countryCode}${mobileNo}. Please enter it below.`
            : `We sent a 6-digit OTP to ${email}. Please enter it below. Don't see the email? Try checking your spam or junk folder.`
        }
        changeText={otpType === "sms" ? "Change mobile number" : "Change email"}
      />
    </div>
  );
};

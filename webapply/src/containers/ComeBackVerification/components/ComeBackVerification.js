import React from "react";
import { useSelector } from "react-redux";

import { Otp } from "../../Otp";

import { useStyles } from "./../styled";
import { getApplicantInfo } from "../../../store/selectors/appConfig";

export const ComeBackVerificationComponent = ({ redirectRoute, otpType, roInviteProp }) => {
  const classes = useStyles();
  const { mobileNo, email, countryCode } = useSelector(getApplicantInfo);
  const suffixNumberStyle = {
    color: "#5E080B",
    fontWeight: 500
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.heading}>Confirm that it’s you</h3>
      <Otp
        redirectRoute={redirectRoute}
        otpType={otpType}
        title={
          otpType === "sms" ? "Let's verify your mobile number" : "Let's verify your email address"
        }
        info={
          otpType === "sms" ? (
            <span>
              We sent a 6-digit OTP to the number{" "}
              <span style={suffixNumberStyle}>
                +{countryCode}
                {mobileNo}
              </span>
              . Please enter it below.
            </span>
          ) : (
            <span>
              We sent a 6-digit OTP to <span style={suffixNumberStyle}>{email}</span>. Please enter
              it below. Don't see the email? Try checking your spam or junk folder.
            </span>
          )
        }
        changeText={otpType === "sms" ? "Change mobile number" : "Change email"}
        roInviteProp={roInviteProp}
      />
    </div>
  );
};

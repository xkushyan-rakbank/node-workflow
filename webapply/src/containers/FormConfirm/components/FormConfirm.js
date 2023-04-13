import React from "react";

import { Otp } from "../..//Otp";
import routes from "../../../routes";

import { useStyles } from "./styled";
import { OtpChannel } from "../../../constants";

export const FormConfirm = ({ otpType, title, info, changeText }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {/* <h2 className={classes.heading}>Confirm It’s You</h2> */}
      <Otp
        title={title}
        info={info}
        changeText={changeText}
        otpType={otpType}
        redirectRoute={otpType === OtpChannel.Sms ? routes.verifyEmailOtp : routes.companyInfo}
        classes={{
          centeredContainer: classes.centeredContainer,
          title: classes.title
        }}
      />
    </div>
  );
};

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  generateOtpCode,
  verifyOtp,
  verifyClearError,
  smsOtpVerified
} from "../../store/actions/otp";
import { getOtp } from "../../store/selectors/otp";
import { getApplicantInfo, getProspectId } from "../../store/selectors/appConfig";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

import { MAX_ATTEMPT_ALLOWED } from "./constants";
import { Form } from "./components/Form";
import { OtpChannel } from "../../constants";
import { triggerDecisions } from "../../store/actions/decisions";
import { getDocumentsList } from "../../store/actions/uploadDocuments";
import routes from "../../routes";
import { updateProspectId } from "../../store/actions/appConfig";
import { resetLogin } from "../../store/actions/loginForm";

export const Otp = ({ redirectRoute, otpType, title, info, changeText, roInviteProp }) => {
  const dispatch = useDispatch();
  const { attempts, verificationError, isVerified, isPending, isGenerating } = useSelector(getOtp);
  const prospectId = useSelector(getProspectId);
  const applicantInfo = useSelector(getApplicantInfo);
  const pushHistory = useTrackingHistory();

  const [code, setCode] = useState(Array(6).fill(""));
  const [loginAttempt, setLoginAttempt] = useState(0);

  const otpRef = useRef(null);

  const resetOtpForm = useCallback(() => {
    setCode(Array(6).fill(""));
    otpRef.current.resetFocus();
  }, [setCode]);

  //if user is verified
  useEffect(() => {
    if (isVerified) {
      if (
        otpType === OtpChannel.Sms &&
        redirectRoute !== routes.MyApplications &&
        redirectRoute !== routes.efrOTPVerification
      ) {
        dispatch(smsOtpVerified());
        const otpData = { ...applicantInfo };
        otpData.action = "generate";
        otpData.mode = OtpChannel.Email;
        dispatch(generateOtpCode(otpData));
      }
      if (otpType === OtpChannel.Email) {
        if (prospectId) {
          dispatch(
            triggerDecisions({
              onValuesChanged: changedValues => {
                // console.log(changedValues);
              },
              inputFields: {
                decision_input: [
                  {
                    input_key: "prospect.applicantInfo.persona",
                    input_value: applicantInfo.persona
                  }
                ]
              }
            })
          );

          //document upload init
          dispatch(getDocumentsList());
        }
      }

      if (!roInviteProp) {
        pushHistory(redirectRoute, true);
      }
    }
  }, [isVerified, pushHistory, redirectRoute]);

  useEffect(() => {
    dispatch(resetLogin());
  }, []);

  useEffect(() => {
    if (roInviteProp && isVerified) {
      dispatch(updateProspectId(roInviteProp.prospectId));
      roInviteProp.getProspectInfo();
    }
  }, [isVerified]);

  useEffect(() => {
    if (verificationError) {
      resetOtpForm();
    }
  }, [verificationError, resetOtpForm]);

  useEffect(() => () => dispatch(verifyClearError()), [dispatch]);

  const handleSendNewCodeLinkClick = useCallback(() => {
    resetOtpForm();
    if (!isGenerating) {
      /* istanbul ignore else */
      if (loginAttempt < MAX_ATTEMPT_ALLOWED) {
        const otpData = { ...applicantInfo };
        otpData.action = "resend";
        otpData.mode = otpType;
        dispatch(generateOtpCode(otpData));
      }
      setLoginAttempt(loginAttempt + 1);
    }
  }, [isGenerating, loginAttempt, dispatch, applicantInfo, resetOtpForm]);

  const submitForm = useCallback(
    () => dispatch(verifyOtp({ code: code.join(""), mode: otpType })),
    [dispatch, code]
  );

  return (
    <Form
      info={info}
      title={title}
      otpType={otpType}
      changeText={changeText}
      applicantInfo={applicantInfo}
      attempts={attempts}
      loginAttempt={loginAttempt}
      isPending={isPending}
      isGenerating={isGenerating}
      verificationError={verificationError}
      otpRef={otpRef}
      code={code}
      setCode={setCode}
      handleSendNewCodeLinkClick={handleSendNewCodeLinkClick}
      submitForm={submitForm}
    />
  );
};

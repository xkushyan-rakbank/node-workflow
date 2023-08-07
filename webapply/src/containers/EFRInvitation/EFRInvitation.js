import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "./components/EFRLoading";
import { OtpChannel, UAE_CODE } from "../../constants";
import { setOtpMode } from "../../store/actions/otp";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";
import { updateProspect } from "../../store/actions/appConfig";
import { getApplicantInfo } from "../../store/selectors/appConfig";

export function EFRInvitation({ generateOtpCode }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const pushHistory = useTrackingHistory();

  const searchParams = new URLSearchParams(location.search);
  const { mobileNo } = useSelector(getApplicantInfo);

  useEffect(() => {
    const prospectId = searchParams.get("prospectId");
    const mode = searchParams.get("mode");
    const mobileNumber = searchParams.get("mobileNo");
    const email = searchParams.get("email");

    //TODO: remove email while committing
    if (!mobileNo) {
      dispatch(
        updateProspect({
          "prospect.applicantInfo.countryCode": UAE_CODE,
          "prospect.applicantInfo.mobileNo": mobileNumber,
          "prospect.applicantInfo.email": email || ""
        })
      );
      let loginData = {};
      loginData.action = "generate";
      loginData.mode = mode || OtpChannel.Sms;
      loginData.mobileNo = mobileNumber;
      loginData.countryCode = UAE_CODE;
      generateOtpCode(loginData).then(
        () => {
          dispatch(setOtpMode(OtpChannel.Sms));
          pushHistory(routes.efrOTPVerification, true, { prospectId });
        },
        () => {}
      );
    }
  }, [searchParams, mobileNo]);

  return <Loader loading={true} />;
}

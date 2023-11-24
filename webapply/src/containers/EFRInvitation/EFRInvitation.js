import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { Loader } from "./components/EFRLoading";
import { OtpChannel, UAE_CODE } from "../../constants";
import { setOtpMode } from "../../store/actions/otp";
import routes from "../../routes";
import { updateProspect } from "../../store/actions/appConfig";
import { getAppConfigLoading, getApplicantInfo } from "../../store/selectors/appConfig";
import { resetLogin } from "../../store/actions/loginForm";

export function EFRInvitation({ generateOtpCode }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const isAppConfigLoading = useSelector(getAppConfigLoading);

  const searchParams = new URLSearchParams(location.search);
  const { mobileNo } = useSelector(getApplicantInfo);

  useEffect(() => {
    dispatch(resetLogin());
  }, []);

  useEffect(() => {
    if (isAppConfigLoading) {
      return;
    }
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
          history.push(routes.efrOTPVerification, { prospectId });
        },
        () => {}
      );
    }
  }, [searchParams, mobileNo, isAppConfigLoading]);

  return <Loader loading={true} />;
}

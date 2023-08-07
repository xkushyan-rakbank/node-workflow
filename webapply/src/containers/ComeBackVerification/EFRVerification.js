import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import routes from "../../routes";
import { ComeBackVerificationComponent } from "./components/ComeBackVerification";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getOtp } from "../../store/selectors/otp";
import { getProspectInfoPromisify } from "../../store/actions/retrieveApplicantInfo";
import { getDocumentsList } from "../../store/actions/uploadDocuments";
import { useDisplayScreenBasedOnViewId } from "../../utils/useDisplayScreenBasedOnViewId";

export const EFROTPVerification = () => {
  useFormNavigation([true, false]);
  const { mode } = useSelector(getOtp);
  const dispatch = useDispatch();
  const location = useLocation();
  const prospectId = location.state.prospectId;
  const { pushDisplayScreenToHistory } = useDisplayScreenBasedOnViewId();

  const getProspectInfo = useCallback(() => {
    dispatch(getProspectInfoPromisify(prospectId)).then(
      prospect => {
        dispatch(getDocumentsList());
        pushDisplayScreenToHistory(prospect);
      },
      () => {}
    );
  }, []);

  const roInviteProp = {
    getProspectInfo,
    prospectId
  };

  return (
    <ComeBackVerificationComponent
      redirectRoute={routes.efrOTPVerification}
      otpType={mode}
      roInviteProp={roInviteProp}
    />
  );
};

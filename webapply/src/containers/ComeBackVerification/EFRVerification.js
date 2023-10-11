import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

import routes from "../../routes";
import { ComeBackVerificationComponent } from "./components/ComeBackVerification";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getOtp } from "../../store/selectors/otp";
import { getProspectInfoPromisify } from "../../store/actions/retrieveApplicantInfo";
import { getDocumentsList } from "../../store/actions/uploadDocuments";
import { useDisplayScreenBasedOnViewId } from "../../utils/useDisplayScreenBasedOnViewId";
import { setRoEFRInvite } from "../../store/actions/otp";
import { EFR_VIEW_IDS } from "../../constants";
import { OverlayLoader } from "../../components/Loader";

export const EFROTPVerification = () => {
  const [loading, setLoading] = useState(false);
  useFormNavigation([true, false]);
  const { mode } = useSelector(getOtp);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const prospectId = location.state.prospectId;
  const { pushDisplayScreenToHistory } = useDisplayScreenBasedOnViewId();

  const getProspectInfo = useCallback(() => {
    setLoading(true);
    dispatch(getProspectInfoPromisify(prospectId)).then(
      prospect => {
        setLoading(false);
        if (EFR_VIEW_IDS.includes(prospect.viewId)) {
          dispatch(getDocumentsList());
          dispatch(setRoEFRInvite(true));
          pushDisplayScreenToHistory(prospect);
        } else {
          history.push(routes.MyApplications);
        }
      },
      () => {}
    );
  }, []);

  const roInviteProp = {
    getProspectInfo,
    prospectId
  };

  return (
    <>
      <OverlayLoader open={loading} text={"Loading"} />
      <ComeBackVerificationComponent
        redirectRoute={routes.efrOTPVerification}
        otpType={mode}
        roInviteProp={roInviteProp}
      />
    </>
  );
};

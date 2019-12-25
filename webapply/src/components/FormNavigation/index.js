import { connect } from "react-redux";
import get from "lodash/get";

import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { isOtpVerified } from "../../store/selectors/otp";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import { FormNavigationComponent } from "./FormNavigation";

const mapStateToProps = state => ({
  applicationInfo: get(state, "appConfig.prospect.applicationInfo", {}),
  isLogin: checkLoginStatus(state),
  name: getApplicantInfo(state).fullName,
  isOtpVerified: isOtpVerified(state)
});

export const FormNavigation = connect(mapStateToProps)(FormNavigationComponent);

import { connect } from "react-redux";

import { setToken } from "../../../store/actions/reCaptcha";
import { loginInfoFormPromisify } from "../../../store/actions/loginForm";
import { getIsRecaptchaEnable } from "../../../store/selectors/appConfig";
import { setIsApplyEditApplication } from "../../../store/actions/searchProspect";
import { LoginComponent } from "./Login";

const mapStateToProps = state => ({
  recaptchaToken: state.reCaptcha.token,
  isRecaptchaEnable: getIsRecaptchaEnable(state)
});

const mapDispatchToProps = {
  login: loginInfoFormPromisify,
  setToken,
  setIsApplyEditApplication
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

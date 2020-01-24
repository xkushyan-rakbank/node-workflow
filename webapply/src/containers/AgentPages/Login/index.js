import { connect } from "react-redux";

import { setToken, setVerified, verifyToken } from "../../../store/actions/reCaptcha";
import { loginInfoForm } from "../../../store/actions/loginForm";
import { getIsRecaptchaEnable } from "../../../store/selectors/appConfig";
import { LoginComponent } from "./Login";

const mapStateToProps = state => ({
  recaptchaToken: state.reCaptcha.token,
  isRecaptchaEnable: getIsRecaptchaEnable(state)
});

const mapDispatchToProps = {
  loginInfoForm,
  setToken,
  verifyToken,
  setVerified
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

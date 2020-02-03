import { connect } from "react-redux";

import { setToken, verifyToken } from "../../../store/actions/reCaptcha";
import { loginInfoFormPromisify } from "../../../store/actions/loginForm";
import { getIsRecaptchaEnable } from "../../../store/selectors/appConfig";
import { LoginComponent } from "./Login";

const mapStateToProps = state => ({
  recaptchaToken: state.reCaptcha.token,
  isRecaptchaEnable: getIsRecaptchaEnable(state)
});

const mapDispatchToProps = {
  loginInfoFormPromisify,
  setToken,
  verifyToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

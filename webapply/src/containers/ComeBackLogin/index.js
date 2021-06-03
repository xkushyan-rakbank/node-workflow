import { connect } from "react-redux";
import { ComeBackLoginContainer } from "./ComeBackLogin";
import { getIsGenerating } from "../../store/selectors/otp";
import { getIsRecaptchaEnable, getReCaptchaSiteKey } from "../../store/selectors/appConfig";
import { generateOtpCodePromisify } from "../../store/actions/otp";
import { setToken } from "../../store/actions/reCaptcha";
import { resetProspect } from "../../store/actions/appConfig";
import { getReCaptchaToken } from "../../store/selectors/reCaptcha";

const mapStateToProps = state => ({
  recaptchaToken: getReCaptchaToken(state),
  reCaptchaSiteKey: getReCaptchaSiteKey(state),
  isRecaptchaEnable: getIsRecaptchaEnable(state),
  isGenerating: getIsGenerating(state),
  isConfigLoading: state.appConfig.loading
});

const mapDispatchToProps = {
  generateOtpCode: generateOtpCodePromisify,
  setToken,
  resetProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComeBackLoginContainer);

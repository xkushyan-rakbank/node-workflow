import { connect } from "react-redux";
import { ComeBackLoginContainer } from "./ComeBackLogin";
import { getIsGenerating, isOtpGenerated } from "../../store/selectors/otp";
import { getIsRecaptchaEnable } from "../../store/selectors/appConfig";
import { generateOtpCode } from "../../store/actions/otp";
import { setToken } from "../../store/actions/reCaptcha";
import { resetProspect } from "../../store/actions/appConfig";

const mapStateToProps = state => ({
  recaptchaToken: state.reCaptcha.token,
  isOtpGenerated: isOtpGenerated(state),
  isRecaptchaEnable: getIsRecaptchaEnable(state),
  isGenerating: getIsGenerating(state),
  isConfigLoading: state.appConfig.loading
});

const mapDispatchToProps = {
  generateOtpCode,
  setToken,
  resetProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComeBackLoginContainer);

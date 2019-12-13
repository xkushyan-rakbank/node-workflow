import { connect } from "react-redux";

import { getOtp } from "../../store/selectors/otp";
import { generateOtpCode, verifyOtp } from "../../store/actions/otp";
import { getApplicantInfo } from "../../store/selectors/appConfig";

import { OTPformComponent } from "./OTPform";

const mapStateToProps = state => ({
  otp: getOtp(state),
  applicantInfo: getApplicantInfo(state)
});

const mapDispatchToProps = {
  generateOtpCode,
  verifyOtp
};

export const OTPform = connect(
  mapStateToProps,
  mapDispatchToProps
)(OTPformComponent);

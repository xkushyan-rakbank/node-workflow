import { connect } from "react-redux";

import { getOtp } from "../../store/selectors/otp";
import { generateOtpCode, verifyOtp, verifyClearError } from "../../store/actions/otp";
import { getApplicantInfo } from "../../store/selectors/appConfig";

import { OtpContainer } from "./Otp";

const mapStateToProps = state => ({
  otp: getOtp(state),
  applicantInfo: getApplicantInfo(state)
});

const mapDispatchToProps = {
  generateOtpCode,
  verifyOtp,
  verifyClearError
};

export const Otp = connect(
  mapStateToProps,
  mapDispatchToProps
)(OtpContainer);

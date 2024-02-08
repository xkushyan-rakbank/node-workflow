import { connect } from "react-redux";

import { getKycStatusPromisify } from "../../store/actions/kyc";
import { EFRInvitation } from "./EFRInvitation";
import { generateOtpCodePromisify } from "../../store/actions/otp";

const mapDispatchToProps = {
  getKycStatus: getKycStatusPromisify,
  generateOtpCode: generateOtpCodePromisify
};

export default connect(
  null,
  mapDispatchToProps
)(EFRInvitation);

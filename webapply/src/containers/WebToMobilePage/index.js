import { connect } from "react-redux";

import { getKycStatusPromisify } from "../../store/actions/kyc";
import { WebToMobilePage } from "./WebToMobilePage";

const mapDispatchToProps = {
  getKycStatus: getKycStatusPromisify
};

export default connect(
  null,
  mapDispatchToProps
)(WebToMobilePage);

import { connect } from "react-redux";

import { loginInfoFormPromisify } from "../../../store/actions/loginForm";
import { LoginComponent } from "./Login";
import { setIsApplyEditApplication } from "../../../store/actions/searchProspect";

const mapDispatchToProps = {
  login: loginInfoFormPromisify,
  setIsApplyEditApplication
};

export default connect(
  null,
  mapDispatchToProps
)(LoginComponent);

import { connect } from "react-redux";

import { ApplicationRedirectPage } from "./ApplicationRedirect";
import { setIsApplyEditApplication } from "../../store/actions/searchProspect";

const mapDispatchToProps = {
  setIsApplyEditApplication
};

export default connect(
  null,
  mapDispatchToProps
)(ApplicationRedirectPage);

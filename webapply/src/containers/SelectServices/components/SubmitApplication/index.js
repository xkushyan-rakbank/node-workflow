import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import * as appConfigSelectors from "../../../../store/selectors/appConfig";
import SubmitApplication from "./SubmitApplication";

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state),
  accountInfo: appConfigSelectors.getAccountInfo(state),
  signatoryInfo: appConfigSelectors.getSignatories(state),
  organizationInfo: appConfigSelectors.getOrganizationInfo(state),
  isAgentLoggedIn: appConfigSelectors.getIsAgentLoggedIn(state)
});

export default compose(
  connect(mapStateToProps),
  withRouter
)(SubmitApplication);

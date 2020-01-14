import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getApplicationInfo,
  getAccountInfo,
  getSignatories,
  getOrganizationInfo,
  getIsAgentLoggedIn
} from "../../../../store/selectors/appConfig";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";
import { updateActionType } from "../../../../store/actions/appConfig";
import { SubmitApplicationComponent } from "./SubmitApplication";

const mapStateToProps = state => ({
  applicationInfo: getApplicationInfo(state),
  accountInfo: getAccountInfo(state),
  signatoryInfo: getSignatories(state),
  organizationInfo: getOrganizationInfo(state),
  isAgentLoggedIn: getIsAgentLoggedIn(state)
});

const mapDispatchToProps = { sendProspectToAPI: sendProspectToAPIPromisify, updateActionType };

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SubmitApplicationComponent);

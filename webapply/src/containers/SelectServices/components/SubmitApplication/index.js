import { connect } from "react-redux";

import {
  getApplicationInfo,
  getAccountInfo,
  getSignatories,
  getOrganizationInfo,
  getIsAgentLoggedIn
} from "../../../../store/selectors/appConfig";
import { SubmitApplicationComponent } from "./SubmitApplication";

const mapStateToProps = state => ({
  applicationInfo: getApplicationInfo(state),
  accountInfo: getAccountInfo(state),
  signatoryInfo: getSignatories(state),
  organizationInfo: getOrganizationInfo(state),
  isAgentLoggedIn: getIsAgentLoggedIn(state)
});

export const SubmitApplication = connect(mapStateToProps)(SubmitApplicationComponent);

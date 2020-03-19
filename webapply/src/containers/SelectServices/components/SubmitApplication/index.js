import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getApplicationInfo,
  getAccountInfo,
  getSignatories,
  getOrganizationInfo
} from "../../../../store/selectors/appConfig";
import { getProspectStatus } from "../../../../store/selectors/searchProspect";
import { checkLoginStatus } from "../../../../store/selectors/loginSelector";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";
import { updateViewId } from "../../../../store/actions/appConfig";
import { SubmitApplicationComponent } from "./SubmitApplication";

const mapStateToProps = state => ({
  applicationInfo: getApplicationInfo(state),
  accountInfo: getAccountInfo(state),
  signatoryInfo: getSignatories(state),
  organizationInfo: getOrganizationInfo(state),
  currentProspectStatus: getProspectStatus(state),
  isAgent: checkLoginStatus(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify,
  updateViewId
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SubmitApplicationComponent);

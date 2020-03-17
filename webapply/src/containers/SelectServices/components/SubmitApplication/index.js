import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getApplicationInfo,
  getAccountInfo,
  getSignatories,
  getOrganizationInfo,
  getLinksConditional
} from "../../../../store/selectors/appConfig";
import {
  getIsEditableStatusSearchInfo,
  getProspectStatus
} from "../../../../store/selectors/searchProspect";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";
import { updateViewId } from "../../../../store/actions/appConfig";
import { SubmitApplicationComponent } from "./SubmitApplication";

const mapStateToProps = state => ({
  applicationInfo: getApplicationInfo(state),
  accountInfo: getAccountInfo(state),
  signatoryInfo: getSignatories(state),
  organizationInfo: getOrganizationInfo(state),
  isApplyEditApplication: getIsEditableStatusSearchInfo(state),
  currentProspectStatus: getProspectStatus(state),
  isLinksVisited: getLinksConditional(state)
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

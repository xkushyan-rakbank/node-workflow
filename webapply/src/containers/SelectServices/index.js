import { connect } from "react-redux";
import get from "lodash/get";

import { getApplicationInfo } from "../../store/selectors/appConfig";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";

import { SelectServicesPage } from "./SelectServicesPage";
import { getAccountType } from "../../store/selectors/appConfig";

const mapStateToProps = state => ({
  accountType: getAccountType(state),
  rakValuePackage: get(getApplicationInfo(state), "rakValuePackage", "")
});

const mapDispatchToProps = { sendProspectToAPI: sendProspectToAPIPromisify };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectServicesPage);

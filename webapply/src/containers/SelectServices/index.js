import { connect } from "react-redux";

import { getRakValuePackage, getSignatories } from "../../store/selectors/appConfig";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { updateProspect } from "../../store/actions/appConfig";
import { SelectServicesPage } from "./SelectServicesPage";
import { getAccountType } from "../../store/selectors/appConfig";

const mapStateToProps = state => ({
  accountType: getAccountType(state),
  rakValuePackage: getRakValuePackage(state),
  signatoriesDetails: getSignatories(state)
});

const mapDispatchToProps = { sendProspectToAPI: sendProspectToAPIPromisify, updateProspect };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectServicesPage);

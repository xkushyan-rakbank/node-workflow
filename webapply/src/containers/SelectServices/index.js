import { connect } from "react-redux";

import { getRakValuePackage } from "../../store/selectors/appConfig";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";

import { SelectServicesPage } from "./SelectServicesPage";
import { getAccountType } from "../../store/selectors/appConfig";

const mapStateToProps = state => ({
  accountType: getAccountType(state),
  rakValuePackage: getRakValuePackage(state)
});

const mapDispatchToProps = { sendProspectToAPI: sendProspectToAPIPromisify };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectServicesPage);

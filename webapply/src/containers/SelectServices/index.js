import { connect } from "react-redux";

import { getInputValueById } from "../../store/selectors/input";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";

import { SelectServicesComponent } from "./SelectServices";
import { getAccountType } from "../../store/selectors/appConfig";

const mapStateToProps = state => ({
  accountType: getAccountType(state),
  rakValuePackage: getInputValueById(state, "Appl.rakValuePackage")
});

const mapDispatchToProps = { sendProspectToAPI: sendProspectToAPIPromisify };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectServicesComponent);

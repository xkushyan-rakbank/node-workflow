import { connect } from "react-redux";

import { getInputValueById } from "../../store/selectors/input";
import { getSelectedTypeCurrency } from "../../store/selectors/SelectServices";
import { updateAccountType } from "../../store/actions/selectedAccountInfo";
import { getSelectedAccountInfo } from "../../store/selectors/selectedAccountInfo";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";

import { SelectServicesComponent } from "./SelectServices";

const mapStateToProps = state => ({
  accountType: getSelectedAccountInfo(state).accountType,
  rakValuePackage: getInputValueById(state, "Appl.rakValuePackage"),
  accountCurrencies: getSelectedTypeCurrency(state, "Acnt.accountCurrencies", [0])
});

const mapDispatchToProps = { updateAccountType, sendProspectToAPI: sendProspectToAPIPromisify };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectServicesComponent);

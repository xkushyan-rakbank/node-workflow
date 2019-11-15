import { connect } from "react-redux";
import { compose } from "redux";

import { getInputValueById } from "../../store/selectors/input";
import { updateAccountType } from "../../store/actions/selectedAccountInfo";
import { getSelectedAccountInfo } from "../../store/selectors/selectedAccountInfo";

import { SelectServices } from "./SelectServices";

const mapStateToProps = state => ({
  accountType: getSelectedAccountInfo(state).accountType,
  rakValuePackage: getInputValueById(state, "Appl.rakValuePackage"),
  accountCurrencies: getInputValueById(state, "Acnt.accountCurrencies", [0])
});

const mapDispatchToProps = { updateAccountType };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SelectServices);

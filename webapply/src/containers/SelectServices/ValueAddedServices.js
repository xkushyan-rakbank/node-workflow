import { connect } from "react-redux";

import { getUrlsReadMore } from "../../store/selectors/appConfig";
import { getGeneralInputProps, getInputValueById } from "../../store/selectors/input";
import { getSelectedAccountInfo } from "../../store/selectors/selectedAccountInfo";
import { updateProspect } from "../../store/actions/appConfig";

import { ValueAddedServicesComponent } from "./components/ValueAddedServices/ValueAddedServices";

const mapStateToProps = state => ({
  readMoreUrls: getUrlsReadMore(state),
  rakValuePackage: getGeneralInputProps(state, "Appl.rakValuePackage"),
  accountCurrencies: getInputValueById(state, "Acnt.accountCurrencies", [0]),
  accountType: getSelectedAccountInfo(state).accountType
});

const mapDispatchToProps = {
  updateProspect
};

export const ValueAddedServices = connect(
  mapStateToProps,
  mapDispatchToProps
)(ValueAddedServicesComponent);

import { connect } from "react-redux";

import { getAccountType, getUrlsReadMore } from "../../store/selectors/appConfig";
import { getGeneralInputProps } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";
import { getSelectedTypeCurrency } from "../../store/selectors/SelectServices";

import { ValueAddedServicesComponent } from "./components/ValueAddedServices/ValueAddedServices";

const mapStateToProps = state => ({
  readMoreUrls: getUrlsReadMore(state),
  rakValuePackage: getGeneralInputProps(state, "Appl.rakValuePackage"),
  accountCurrencies: getSelectedTypeCurrency(state, "Acnt.accountCurrencies", [0]),
  accountType: getAccountType(state)
});

const mapDispatchToProps = {
  updateProspect
};

export const ValueAddedServices = connect(
  mapStateToProps,
  mapDispatchToProps
)(ValueAddedServicesComponent);

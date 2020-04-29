import { connect } from "react-redux";

import {
  getAccountType,
  getUrlsReadMore,
  getRakValuePackage
} from "../../../../store/selectors/appConfig";
import { getSelectedTypeCurrency } from "../../../../store/selectors/selectServices";
import { updateProspect } from "../../../../store/actions/appConfig";

import { ValueAddedServicesComponent } from "./ValueAddedServices";

const mapStateToProps = state => ({
  readMoreUrls: getUrlsReadMore(state),
  rakValuePackage: getRakValuePackage(state),
  accountCurrencies: getSelectedTypeCurrency(state),
  accountType: getAccountType(state)
});

const mapDispatchToProps = {
  updateProspect
};

export const ValueAddedServices = connect(
  mapStateToProps,
  mapDispatchToProps
)(ValueAddedServicesComponent);

import { connect } from "react-redux";
import get from "lodash/get";

import {
  getAccountInfo,
  getAccountType,
  getUrlsReadMore,
  getApplicationInfo
} from "../../../../store/selectors/appConfig";
import { getSelectedTypeCurrency } from "../../../../store/selectors/selectServices";
import { updateProspect } from "../../../../store/actions/appConfig";

import { ValueAddedServicesComponent } from "./ValueAddedServices";

const mapStateToProps = state => ({
  readMoreUrls: getUrlsReadMore(state),
  rakValuePackage: get(getApplicationInfo(state), "rakValuePackage", ""),
  accountCurrencies: getSelectedTypeCurrency(
    get(getAccountInfo(state)[0], "accountCurrencies", "")
  ),
  accountType: getAccountType(state)
});

const mapDispatchToProps = {
  updateProspect
};

export const ValueAddedServices = connect(
  mapStateToProps,
  mapDispatchToProps
)(ValueAddedServicesComponent);

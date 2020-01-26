import { connect } from "react-redux";
import get from "lodash/get";

import { getSignatories } from "../../store/selectors/appConfig";
import { getOrganizationInfo } from "../../store/selectors/appConfig";
import { getGeneralInputProps } from "../../store/selectors/input";
import { getSelectedTypeCurrency } from "../../store/selectors/SelectServices";
import { stakeholdersSelector, checkIsHasSignatories } from "../../store/selectors/stakeholder";
import { updateProspect } from "../../store/actions/appConfig";
import { getAccountInfo } from "../../store/selectors/appConfig";

import { ChannelsComponent } from "./components/Channels/Channels";

const mapStateToProps = state => ({
  ...getSignatories(state)[0],
  accountCurrencies: getSelectedTypeCurrency(
    get(getAccountInfo(state)[0], "accountCurrencies", "")
  ),
  debitCardApplied: getGeneralInputProps(state, "Acnt.debitCardApplied", [0]),
  chequeBook: getGeneralInputProps(state, "Acnt.chequeBookApplied", [0]),
  eStatements: getGeneralInputProps(state, "Acnt.eStatements", [0]),
  mailStatements: getGeneralInputProps(state, "Acnt.mailStatements", [0]),
  stakeholders: stakeholdersSelector(state),
  isHasSignatories: checkIsHasSignatories(state),
  primaryMobCountryCode: get(
    getOrganizationInfo(state),
    "contactDetails.primaryMobCountryCode",
    ""
  ),
  primaryPhoneCountryCode: get(
    getOrganizationInfo(state),
    "contactDetails.primaryPhoneCountryCode",
    ""
  )
});

const mapDispatchToProps = {
  updateProspect
};

export const Channels = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsComponent);

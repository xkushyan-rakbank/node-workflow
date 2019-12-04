import { connect } from "react-redux";

import { getSignatories } from "../../store/selectors/appConfig";
import { getInputValueById } from "../../store/selectors/input";
import { getGeneralInputProps } from "../../store/selectors/input";
import { getSelectedTypeCurrency } from "../../store/selectors/SelectServices";
import { stakeholdersSelector, checkIsHasSignatories } from "../../store/selectors/stakeholder";
import { updateProspect } from "../../store/actions/appConfig";

import { ChannelsComponent } from "./components/Channels/Channels";

const mapStateToProps = state => ({
  ...getSignatories(state)[0],
  accountCurrencies: getSelectedTypeCurrency(state, "Acnt.accountCurrencies", [0]),
  debitCardApplied: getGeneralInputProps(state, "Acnt.debitCardApplied", [0]),
  chequeBook: getGeneralInputProps(state, "Acnt.chequeBookApplied", [0]),
  eStatements: getGeneralInputProps(state, "Acnt.eStatements", [0]),
  mailStatements: getGeneralInputProps(state, "Acnt.mailStatements", [0]),
  stakeholders: stakeholdersSelector(state),
  isHasSignatories: checkIsHasSignatories(state),
  primaryMobCountryCode: getInputValueById(state, "OrgCont.primaryMobCountryCode"),
  primaryPhoneCountryCode: getInputValueById(state, "OrgCont.primaryPhoneCountryCode")
});

const mapDispatchToProps = {
  updateProspect
};

export const Channels = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsComponent);

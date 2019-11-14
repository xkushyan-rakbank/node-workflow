import { connect } from "react-redux";

import * as appConfigSelectors from "../../../../store/selectors/appConfig";
import { getInputValueById } from "../../../../store/selectors/input";
import { getGeneralInputProps } from "../../../../store/selectors/input";
import { stakeholders as stakeholdersSelector } from "../../../../store/selectors/stakeholder";
import { updateProspect } from "../../../../store/actions/appConfig";

import { AccountDetails } from "./Channels";

const mapStateToProps = state => ({
  ...appConfigSelectors.getSignatories(state)[0],
  accountCurrencies: getInputValueById(state, "Acnt.accountCurrencies", [0]),
  debitCardApplied: getGeneralInputProps(state, "Acnt.debitCardApplied", [0]),
  chequeBook: getGeneralInputProps(state, "Acnt.chequeBookApplied", [0]),
  eStatements: getGeneralInputProps(state, "Acnt.eStatements", [0]),
  mailStatements: getGeneralInputProps(state, "Acnt.mailStatements", [0]),
  stakeholders: stakeholdersSelector(state),
  primaryMobCountryCode: getInputValueById(state, "OrgCont.primaryMobCountryCode"),
  primaryPhoneCountryCode: getInputValueById(state, "OrgCont.primaryPhoneCountryCode")
});

const mapDispatchToProps = {
  updateProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetails);

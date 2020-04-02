import { connect } from "react-redux";
import get from "lodash/get";

import { getSignatories } from "../../store/selectors/appConfig";
import { getOrganizationInfo } from "../../store/selectors/appConfig";
import { getSelectedTypeCurrency } from "../../store/selectors/selectServices";
import { stakeholdersSelector, checkIsHasSignatories } from "../../store/selectors/stakeholder";
import { updateProspect } from "../../store/actions/appConfig";
import { getAccountInfo } from "../../store/selectors/appConfig";

import { ChannelsComponent } from "./components/Channels/Channels";

const mapStateToProps = state => ({
  ...getSignatories(state)[0],
  accountCurrencies: getSelectedTypeCurrency(
    get(getAccountInfo(state)[0], "accountCurrencies", "")
  ),
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

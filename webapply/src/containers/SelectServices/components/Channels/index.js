import { connect } from "react-redux";
import get from "lodash/get";

import {
  getSignatories,
  getAccountInfo,
  getOrganizationInfo
} from "../../../../store/selectors/appConfig";
import { getSelectedTypeCurrency } from "../../../../store/selectors/selectServices";
import { getStakeholders, checkIsHasSignatories } from "../../../../store/selectors/stakeholders";
import { updateProspect } from "../../../../store/actions/appConfig";

import { ChannelsComponent } from "./Channels";

const mapStateToProps = state => ({
  ...getSignatories(state)[0],
  accountCurrencies: getSelectedTypeCurrency(
    get(getAccountInfo(state)[0], "accountCurrencies", "")
  ),
  stakeholders: getStakeholders(state),
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

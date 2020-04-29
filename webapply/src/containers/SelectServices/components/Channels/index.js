import { connect } from "react-redux";

import { getPrimaryMobCountryCode } from "../../../../store/selectors/appConfig";
import { getSelectedTypeCurrency } from "../../../../store/selectors/selectServices";
import { getStakeholders, checkIsHasSignatories } from "../../../../store/selectors/stakeholders";
import { updateProspect } from "../../../../store/actions/appConfig";

import { ChannelsComponent } from "./Channels";

const mapStateToProps = state => ({
  selectedCurrency: getSelectedTypeCurrency(state),
  stakeholders: getStakeholders(state),
  isHasSignatories: checkIsHasSignatories(state),
  primaryMobCountryCode: getPrimaryMobCountryCode(state)
});

const mapDispatchToProps = {
  updateProspect
};

export const Channels = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsComponent);

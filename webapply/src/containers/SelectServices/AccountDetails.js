import { connect } from "react-redux";

import { getIsIslamicBanking } from "../../store/selectors/appConfig";
import { updateProspect } from "../../store/actions/appConfig";

import { AccountDetailsComponent } from "./components/AccountDetails/AccountDetails";

const mapStateToProps = state => ({
  islamicBanking: getIsIslamicBanking(state)
});

const mapDispatchToProps = {
  updateProspect
};

export const AccountDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetailsComponent);

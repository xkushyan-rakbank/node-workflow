import { connect } from "react-redux";

import { getIsIslamicBanking } from "../../../../store/selectors/appConfig";

import { AccountDetailsComponent } from "./AccountDetails";

const mapStateToProps = state => ({
  islamicBanking: getIsIslamicBanking(state)
});

export const AccountDetails = connect(mapStateToProps)(AccountDetailsComponent);
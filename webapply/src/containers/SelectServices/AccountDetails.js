import { connect } from "react-redux";

import { getApplicationInfo } from "../../store/selectors/appConfig";

import { AccountDetailsComponent } from "./components/AccountDetails/AccountDetails";

const mapStateToProps = state => ({
  applicationInfo: getApplicationInfo(state)
});

export const AccountDetails = connect(mapStateToProps)(AccountDetailsComponent);

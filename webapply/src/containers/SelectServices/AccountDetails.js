import { connect } from "react-redux";

import { getApplicationInfo } from "../../store/selectors/appConfig";
import { updateProspect } from "../../store/actions/appConfig";

import { AccountDetailsComponent } from "./components/AccountDetails/AccountDetails";

const mapStateToProps = state => ({
  applicationInfo: getApplicationInfo(state)
});

const mapDispatchToProps = {
  updateProspect
};

export const AccountDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetailsComponent);

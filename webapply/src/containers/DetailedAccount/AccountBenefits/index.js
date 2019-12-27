import { connect } from "react-redux";

import { getApplicationInfo } from "../../../store/selectors/appConfig";
import { AccountBenefitsComponent } from "./AccountBenefits";

const mapStateToProps = state => ({
  applicationInfo: getApplicationInfo(state)
});

export const AccountBenefits = connect(mapStateToProps)(AccountBenefitsComponent);

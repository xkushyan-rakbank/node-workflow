import { connect } from "react-redux";

import { ApplicationOverviewComponent } from "./ApplicationOverview";
import { getApplicationInfo } from "../../../store/selectors/appConfig";

const mapStateToProps = state => ({
  applicationInfo: getApplicationInfo(state)
});

export const ApplicationOverview = connect(mapStateToProps)(ApplicationOverviewComponent);

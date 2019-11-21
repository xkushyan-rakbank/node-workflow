import { compose } from "redux";
import { connect } from "react-redux";

import { AccountDetailsComponent } from "./AccountDetails";
import * as appConfigSelectors from "../../../../store/selectors/appConfig";

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

export const AccountDetails = compose(connect(mapStateToProps))(AccountDetailsComponent);

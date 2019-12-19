import { connect } from "react-redux";
import get from "lodash/get";

import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { FormNavigationComponent } from "./FormNavigation";

const mapStateToProps = state => ({
  applicationInfo: get(state, "appConfig.prospect.applicationInfo", {}),
  isLogin: checkLoginStatus(state)
});

export const FormNavigation = connect(mapStateToProps)(FormNavigationComponent);

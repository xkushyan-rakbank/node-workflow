import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { getErrorCode, getIsEditableStatusSearchInfo } from "../../store/selectors/searchProspect";
import {
  getAccountType,
  getIsIslamicBanking,
  getScreeningError
} from "../../store/selectors/appConfig";
import { updateViewId } from "../../store/actions/appConfig";
import { setLockStatusByROAgent } from "../../store/actions/searchProspect";
import { logout } from "../../store/actions/loginForm";
import { FormLayoutComponent } from "./FormLayout";
import { checkLoginStatus } from "../../store/selectors/loginSelector";

const mapStateToProps = state => ({
  screeningError: getScreeningError(state),
  accountType: getAccountType(state),
  isIslamicBanking: getIsIslamicBanking(state),
  errorCode: getErrorCode(state),
  isApplyEditApplication: getIsEditableStatusSearchInfo(state),
  isAgentLoggedIn: checkLoginStatus(state)
});

const mapDispatchToProps = {
  updateViewId,
  setLockStatusByROAgent,
  logout
};

export const FormLayout = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(FormLayoutComponent);

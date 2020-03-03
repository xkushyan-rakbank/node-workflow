import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { getIsUserInformedROEditStatus } from "../../store/selectors/searchProspect";
import {
  getAccountType,
  getIsIslamicBanking,
  getScreeningError
} from "../../store/selectors/appConfig";
import { updateViewId } from "../../store/actions/appConfig";
import { setLockStatusByROAgent } from "../../store/actions/searchProspect";
import { FormLayoutComponent } from "./FormLayout";

const mapStateToProps = state => ({
  screeningError: getScreeningError(state),
  accountType: getAccountType(state),
  isIslamicBanking: getIsIslamicBanking(state),
  isLockStatusByROAgent: getIsUserInformedROEditStatus(state)
});

const mapDispatchToProps = {
  updateViewId,
  setLockStatusByROAgent
};

export const FormLayout = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(FormLayoutComponent);

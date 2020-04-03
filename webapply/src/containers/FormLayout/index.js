import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { getErrorCode } from "../../store/selectors/searchProspect";
import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";
import { updateViewId } from "../../store/actions/appConfig";
import { FormLayoutComponent } from "./FormLayout";
import { getScreeningError } from "../../store/selectors/sendProspectToAPI";

const mapStateToProps = state => ({
  screeningError: getScreeningError(state),
  accountType: getAccountType(state),
  isIslamicBanking: getIsIslamicBanking(state),
  errorCode: getErrorCode(state)
});

const mapDispatchToProps = {
  updateViewId
};

export const FormLayout = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(FormLayoutComponent);

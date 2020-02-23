import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import {
  getAccountType,
  getIsIslamicBanking,
  getScreeningError
} from "../../store/selectors/appConfig";
import { updateViewId } from "../../store/actions/appConfig";
import { resetScreeningError } from "../../store/actions/sendProspectToAPI";
import { FormLayoutComponent } from "./FormLayout";

const mapStateToProps = state => ({
  screeningError: getScreeningError(state),
  accountType: getAccountType(state),
  islamicBanking: getIsIslamicBanking(state)
});

const mapDispatchToProps = {
  updateViewId,
  resetScreeningError
};

export const FormLayout = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(FormLayoutComponent);

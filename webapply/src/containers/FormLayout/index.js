import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { getSendProspectToAPIInfo } from "../../store/selectors/appConfig";
import { updateViewId } from "../../store/actions/appConfig";
import { resetScreeningError } from "../../store/actions/sendProspectToAPI";
import { FormLayoutComponent } from "./FormLayout";

const mapStateToProps = state => ({
  screeningResults: getSendProspectToAPIInfo(state)
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

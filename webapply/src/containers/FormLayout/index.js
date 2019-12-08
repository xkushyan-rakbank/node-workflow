import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { getScreeningResults } from "../../store/selectors/appConfig";
import { updateViewId } from "../../store/actions/appConfig";
import { FormLayoutComponent } from "./FormLayout";

const mapStateToProps = state => ({
  screeningResults: getScreeningResults(state)
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

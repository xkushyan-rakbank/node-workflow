import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { TableCompareComponent } from "./TableCompare";
import { updateProspect } from "../../../../store/actions/appConfig";

const mapDispatchToProps = {
  updateProspect
};

export const TableCompare = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withRouter
)(TableCompareComponent);

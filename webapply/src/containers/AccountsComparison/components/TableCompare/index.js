import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { TableCompareComponent } from "./TableCompare";
import { updateAccountType } from "../../../../store/actions/selectedAccountInfo";
import { getApplicationInfo } from "../../../../store/selectors/appConfig";

const mapStateToProps = state => ({
  applicationInfo: getApplicationInfo(state)
});

const mapDispatchToProps = {
  updateAccountType
};

export const TableCompare = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(TableCompareComponent);

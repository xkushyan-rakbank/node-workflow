import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import TableCompare from "./TableCompare";
import { updateAccountType } from "../../../../store/actions/selectedAccountInfo";
import { updateProspect } from "../../../../store/actions/appConfig";
import { getApplicationInfo } from "../../../../store/selectors/appConfig";

const mapStateToProps = state => ({
  applicationInfo: getApplicationInfo(state)
});

const mapDispatchToProps = {
  updateProspect,
  updateAccountType
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(TableCompare);

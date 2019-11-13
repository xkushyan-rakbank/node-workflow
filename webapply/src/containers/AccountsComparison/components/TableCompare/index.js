import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import TableCompare from "./TableCompare";
import { updateAccountType } from "../../../../store/actions/selectedAccountInfo";
import { updateProspect } from "../../../../store/actions/appConfig";
import * as appConfigSelectors from "../../../../store/selectors/appConfig";
import { withStyles } from "@material-ui/core/styles/index";
import styled from "./styled";

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
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
  withStyles(styled),
  withRouter
)(TableCompare);

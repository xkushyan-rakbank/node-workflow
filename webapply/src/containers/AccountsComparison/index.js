import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { updateProspect } from "../../store/actions/appConfig";
import { getServicePricingGuideUrl } from "../../store/selectors/appConfig";
import { withStyles } from "@material-ui/core/styles/index";
import AccountsComparison from "./AccountsComparison";
import styled from "./styled";

const mapStateToProps = state => ({
  servicePricingGuideUrl: getServicePricingGuideUrl(state)
});
const mapDispatchToProps = {
  updateProspect
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styled),
  withRouter
)(AccountsComparison);

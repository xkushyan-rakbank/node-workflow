import { connect } from "react-redux";
import { compose } from "redux";
import { getServicePricingGuideUrl } from "../../store/selectors/appConfig";
import { withStyles } from "@material-ui/core/styles/index";
import AccountsComparison from "./AccountsComparison";
import styled from "./styled";

const mapStateToProps = state => ({
  servicePricingGuideUrl: getServicePricingGuideUrl(state)
});

export default compose(
  connect(mapStateToProps),
  withStyles(styled)
)(AccountsComparison);

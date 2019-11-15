import { connect } from "react-redux";
import { getServicePricingGuideUrl } from "../../store/selectors/appConfig";
import { AccountsComparisonComponent } from "./AccountsComparison";

const mapStateToProps = state => ({
  servicePricingGuideUrl: getServicePricingGuideUrl(state)
});

export const AccountsComparison = connect(mapStateToProps)(AccountsComparisonComponent);

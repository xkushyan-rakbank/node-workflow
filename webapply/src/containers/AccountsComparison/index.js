import { connect } from "react-redux";
import { getServicePricingGuideUrl } from "../../store/selectors/appConfig";
import { AccountsComparisonContainer } from "./AccountsComparison";

const mapStateToProps = state => ({
  servicePricingGuideUrl: getServicePricingGuideUrl(state)
});

export default connect(mapStateToProps)(AccountsComparisonContainer);

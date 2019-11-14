import { connect } from "react-redux";
import { getServicePricingGuideUrl } from "../../store/selectors/appConfig";
import AccountsComparison from "./AccountsComparison";

const mapStateToProps = state => ({
  servicePricingGuideUrl: getServicePricingGuideUrl(state)
});

export default connect(mapStateToProps)(AccountsComparison);

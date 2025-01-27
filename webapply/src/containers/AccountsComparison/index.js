import { connect } from "react-redux";
import { getServicePricingGuideUrl } from "../../store/selectors/appConfig";
import { setProspectLead, setRoCode } from "../../store/actions/appConfig";
import { AccountsComparisonContainer } from "./AccountsComparison";

const mapStateToProps = state => ({
  servicePricingGuideUrl: getServicePricingGuideUrl(state)
});
const mapDispatchToProps = {
  setProspectLead,
  setRoCode
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsComparisonContainer);

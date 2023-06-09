import { connect } from "react-redux";

import { StakeholdersTermsAndConditions } from "./StakeholderTermsAndConditions";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

const StakeholderTermsAndConditions = connect(
  null,
  mapDispatchToProps
)(StakeholdersTermsAndConditions);

export default StakeholderTermsAndConditions;

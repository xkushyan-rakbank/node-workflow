import { connect } from "react-redux";

import { AdditionalInformation } from "./AdditionalInformation";
import { getApplicantEditedFullName, getApplicantFullName } from "../../store/selectors/appConfig";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";

const mapStateToProps = state => ({
  stakeholderName: getApplicantEditedFullName(state) || getApplicantFullName(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalInformation);

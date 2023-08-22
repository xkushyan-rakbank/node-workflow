import { connect } from "react-redux";

import { AdditionalInformation } from "./AdditionalInformation";
import { getApplicantEditedFullName, getApplicantFullName } from "../../store/selectors/appConfig";

const mapStateToProps = state => ({
  stakeholderName: getApplicantEditedFullName(state) || getApplicantFullName(state)
});

export default connect(mapStateToProps)(AdditionalInformation);

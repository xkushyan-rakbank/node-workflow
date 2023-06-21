import { connect } from "react-redux";

import { AdditionalStakeholderInformation } from "./AdditionalStakeholderInformation";
import {
  getApplicantEditedFullName,
  getApplicantFullName,
  getOrganizationInfo
} from "../../../../store/selectors/appConfig";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";

const mapStateToProps = state => ({
  stakeholderName: getApplicantEditedFullName(state) || getApplicantFullName(state),
  companyCategory: getOrganizationInfo(state).companyCategory
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

const CompanyInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalStakeholderInformation);

export default CompanyInformation;

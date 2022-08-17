import { connect } from "react-redux";

import { getIsEditableStatusSearchInfo } from "../../store/selectors/searchProspect";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import {
  getApplicantFullName,
  getCompanyName,
  getKycAnnexureDetails
} from "../../store/selectors/appConfig";
import { getIsSendingProspect } from "../../store/selectors/sendProspectToAPI";

import { CompanyInfoPage } from "./CompanyInfoPage";

const mapStateToProps = state => ({
  isSendingProspect: getIsSendingProspect(state),
  fullName: getApplicantFullName(state),
  companyName: getCompanyName(state),
  isComeFromROScreens: getIsEditableStatusSearchInfo(state),
  kycAnnexureDetails: getKycAnnexureDetails(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyInfoPage);

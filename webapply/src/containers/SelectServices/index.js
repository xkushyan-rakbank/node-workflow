import { connect } from "react-redux";
import get from "lodash/get";
import { getIsEditableStatusSearchInfo } from "../../store/selectors/searchProspect";
import {
  getRakValuePackage,
  getSignatories,
  getOrgKYCDetails,
  getKycAnnexureDetails,
  getCompanyBankStatements,
  getCompanyName
} from "../../store/selectors/appConfig";
import { initialBankDetails, initialsignatoryDetails } from "./constants";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { updateProspect } from "../../store/actions/appConfig";
import { SelectServicesPage } from "./SelectServicesPage";
import {
  getAccountType,
  getDatalist,
  getInitialProspectTableCheck,
  getInitialKycEditCheck
} from "../../store/selectors/appConfig";
import { getAgentName, getAgentId } from "../../store/selectors/loginSelector";

const mapStateToProps = state => ({
  accountType: getAccountType(state),
  rakValuePackage: getRakValuePackage(state),
  signatoriesDetails: getSignatories(state),
  isComeFromROScreens: getIsEditableStatusSearchInfo(state),
  datalist: getDatalist(state),
  topCustomers: get(getOrgKYCDetails(state), "topCustomers"),
  otherBankDetails: get(getOrgKYCDetails(state), "otherBankingRelationshipsInfo.otherBankDetails"),
  kycAnnexureDetails: getKycAnnexureDetails(state),
  companyBankStatements: getCompanyBankStatements(state),
  companyName: getCompanyName(state),
  orgDetails: getOrgKYCDetails(state),
  getKycAnnexureBankDetails: get(getKycAnnexureDetails(state), "bankDetails", initialBankDetails),
  getKycAnnexuresignatoryDetails: get(
    getKycAnnexureDetails(state),
    "signatoryDetails",
    initialsignatoryDetails
  ),
  roAgentName: getAgentName(state),
  roagentId: getAgentId(state),
  prospectData: getInitialProspectTableCheck(state),
  isKycInitailEdit: getInitialKycEditCheck(state)
});

const mapDispatchToProps = { sendProspectToAPI: sendProspectToAPIPromisify, updateProspect };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectServicesPage);

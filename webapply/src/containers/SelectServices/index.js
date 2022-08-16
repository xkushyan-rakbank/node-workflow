import { connect } from "react-redux";
import get from "lodash/get";
import { getIsEditableStatusSearchInfo } from "../../store/selectors/searchProspect";
import {
  getRakValuePackage,
  getSignatories,
  getOrgKYCDetails,
  getKycAnnexureDetails
} from "../../store/selectors/appConfig";
import { initialBankDetails } from "./constants";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { updateProspect } from "../../store/actions/appConfig";
import { SelectServicesPage } from "./SelectServicesPage";
import { getAccountType, getDatalist } from "../../store/selectors/appConfig";

const mapStateToProps = state => ({
  accountType: getAccountType(state),
  rakValuePackage: getRakValuePackage(state),
  signatoriesDetails: getSignatories(state),
  isComeFromROScreens: getIsEditableStatusSearchInfo(state),
  datalist: getDatalist(state),
  topCustomers: get(getOrgKYCDetails(state), "topCustomers"),
  otherBankDetails: get(getOrgKYCDetails(state), "otherBankingRelationshipsInfo.otherBankDetails"),
  getKycAnnexureDetails: getKycAnnexureDetails(state),
  getKycAnnexureBankDetails: get(getKycAnnexureDetails(state), "bankDetails", initialBankDetails)
});

const mapDispatchToProps = { sendProspectToAPI: sendProspectToAPIPromisify, updateProspect };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectServicesPage);

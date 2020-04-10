import { connect } from "react-redux";

import {
  getSignatories,
  getIsRequiredDocsUploaded,
  getCompanyName,
  getCompanyDocuments,
  getStakeholdersDocuments
} from "../../store/selectors/appConfig";
import { getIsLoadingDocuments } from "../../store/selectors/uploadDocuments";
import { UploadDocuments } from "./UploadDocuments";
import { saveAndRetrieveDocDetails } from "../../store/actions/uploadDocuments";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import {
  getIsEditableStatusSearchInfo,
  getProspectStatus
} from "../../store/selectors/searchProspect";

const mapStateToProps = state => ({
  companyDocuments: getCompanyDocuments(state),
  stakeholdersDocuments: getStakeholdersDocuments(state),
  companyName: getCompanyName(state),
  signatories: getSignatories(state),
  isRequiredDocsUploaded: getIsRequiredDocsUploaded(state),
  isLoadingDocuments: getIsLoadingDocuments(state),
  prospectStatusInfo: getProspectStatus(state),
  isApplyEditApplication: getIsEditableStatusSearchInfo(state)
});

const mapDispatchToProps = {
  retrieveDocDetails: saveAndRetrieveDocDetails,
  sendProspectToAPI: sendProspectToAPIPromisify
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocuments);

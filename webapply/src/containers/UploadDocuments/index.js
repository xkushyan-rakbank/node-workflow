import { connect } from "react-redux";

import {
  getProspectDocuments,
  getSignatories,
  getEndpoints,
  getProspectId,
  getUploadedDocsCount,
  getRequiredDocsCount,
  isLoadingDocuments
} from "../../store/selectors/appConfig";
import { UploadDocument } from "./UploadDocument";
import {
  retrieveDocDetails,
  docUpload,
  cancelDocUpload,
  getProspectDocumentsRequest
} from "../../store/actions/getProspectDocuments";
import { updateProspect } from "../../store/actions/appConfig";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { getOrganizationInfo } from "../../store/selectors/appConfig";
import {
  getIsEditableStatusSearchInfo,
  getProspectStatus
} from "../../store/selectors/searchProspect";

const mapStateToProps = state => ({
  documents: getProspectDocuments(state),
  companyName: getOrganizationInfo(state).companyName,
  signatories: getSignatories(state),
  uploadDocsEndpoints: getEndpoints(state),
  prospectID: getProspectId(state),
  uploadedDocsCount: getUploadedDocsCount(state),
  requiredDocsCount: getRequiredDocsCount(state),
  progress: state.uploadDocuments.progress,
  uploadErrorMessage: state.uploadDocuments.uploadErrors,
  isLoading: isLoadingDocuments(state),
  prospectStatusInfo: getProspectStatus(state),
  isApplyEditApplication: getIsEditableStatusSearchInfo(state)
});

const mapDispatchToProps = {
  retrieveDocDetails,
  docUpload,
  cancelDocUpload,
  sendProspectToAPI: sendProspectToAPIPromisify,
  updateProspect,
  getProspectDocumentsRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocument);

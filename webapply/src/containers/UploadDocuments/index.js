import { connect } from "react-redux";

import {
  getSignatories,
  getProspectId,
  getIsRequiredDocsUploaded,
  getDocuments
} from "../../store/selectors/appConfig";
import { getIsLoadingDocuments } from "../../store/selectors/uploadDocuments";
import { UploadDocument } from "./UploadDocument";
import {
  docUpload,
  cancelDocUpload,
  saveAndRetrieveDocDetails
} from "../../store/actions/getProspectDocuments";
import { updateProspect } from "../../store/actions/appConfig";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { getOrganizationInfo } from "../../store/selectors/appConfig";
import {
  getIsEditableStatusSearchInfo,
  getProspectStatus
} from "../../store/selectors/searchProspect";

const mapStateToProps = state => ({
  documents: getDocuments(state),
  companyName: getOrganizationInfo(state).companyName,
  signatories: getSignatories(state),
  prospectID: getProspectId(state),
  isRequiredDocsUploaded: getIsRequiredDocsUploaded(state),
  progress: state.uploadDocuments.progress,
  uploadErrorMessage: state.uploadDocuments.uploadErrors,
  isLoadingDocuments: getIsLoadingDocuments(state),
  prospectStatusInfo: getProspectStatus(state),
  isApplyEditApplication: getIsEditableStatusSearchInfo(state)
});

const mapDispatchToProps = {
  retrieveDocDetails: saveAndRetrieveDocDetails,
  docUpload,
  cancelDocUpload,
  sendProspectToAPI: sendProspectToAPIPromisify,
  updateProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocument);

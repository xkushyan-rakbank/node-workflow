import { connect } from "react-redux";

import { getSignatories, getProspectId } from "../../store/selectors/appConfig";
import {
  getProspectDocuments,
  getisLoadingDocuments,
  getIsRequiredDocsUploaded
} from "../../store/selectors/getProspectDocuments";
import { UploadDocument } from "./UploadDocument";
import {
  retrieveDocDetails,
  docUpload,
  cancelDocUpload
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
  prospectID: getProspectId(state),
  isRequiredDocsUploaded: getIsRequiredDocsUploaded(state),
  progress: state.uploadDocuments.progress,
  uploadErrorMessage: state.uploadDocuments.uploadErrors,
  isLoading: getisLoadingDocuments(state),
  prospectStatusInfo: getProspectStatus(state),
  isApplyEditApplication: getIsEditableStatusSearchInfo(state)
});

const mapDispatchToProps = {
  retrieveDocDetails,
  docUpload,
  cancelDocUpload,
  sendProspectToAPI: sendProspectToAPIPromisify,
  updateProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocument);

import { connect } from "react-redux";
import get from "lodash/get";

import {
  getProspectDocuments,
  getSignatories,
  getEndpoints,
  getProspectId,
  getUploadedDocsCount,
  getRequiredDocsCount
} from "../../store/selectors/appConfig";
import { UploadDocument } from "./UploadDocument";
import {
  retrieveDocDetails,
  docUpload,
  cancelDocUpload
} from "../../store/actions/getProspectDocuments";
import { updateProspect } from "../../store/actions/appConfig";
import { getOrganizationInfo } from "../../store/selectors/appConfig";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";

const mapStateToProps = state => ({
  documents: getProspectDocuments(state),
  companyName: get(getOrganizationInfo(state), "companyName", ""),
  signatories: getSignatories(state),
  uploadDocsEndpoints: getEndpoints(state),
  prospectID: getProspectId(state),
  uploadedDocsCount: getUploadedDocsCount(state),
  requiredDocsCount: getRequiredDocsCount(state),
  progress: state.uploadDocuments.progress,
  uploadErrorMessage: state.uploadDocuments.uploadErrors
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

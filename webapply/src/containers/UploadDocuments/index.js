import { connect } from "react-redux";
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
import { getInputValueById } from "../../store/selectors/input";

const mapStateToProps = state => ({
  documents: getProspectDocuments(state),
  companyName: getInputValueById(state, "Org.companyName"),
  signatories: getSignatories(state),
  uploadDocsEndpoints: getEndpoints(state),
  prospectID: getProspectId(state),
  uploadedDocsCount: getUploadedDocsCount(state),
  requiredDocsCount: getRequiredDocsCount(state),
  progress: state.uploadDocuments.progress
});

const mapDispatchToProps = {
  retrieveDocDetails,
  docUpload,
  cancelDocUpload,
  updateProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocument);

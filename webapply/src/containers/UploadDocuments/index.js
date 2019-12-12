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
import { retrieveDocDetails, docUpload } from "../../store/actions/getProspectDocuments";
import { getInputValueById } from "../../store/selectors/input";

const mapStateToProps = state => ({
  documents: getProspectDocuments(state),
  companyName: getInputValueById(state, "Org.companyName"),
  signatories: getSignatories(state),
  uploadDocsEndpoints: getEndpoints(state),
  prospectID: getProspectId(state),
  uploadedDocsCount: getUploadedDocsCount(state),
  requiredDocCount: getRequiredDocsCount(state)
});

const mapDispatchToProps = {
  retrieveDocDetails,
  docUpload
};

export const UploadDocuments = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocument);

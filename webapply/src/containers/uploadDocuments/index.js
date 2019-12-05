import { connect } from "react-redux";
import {
  getProspectDocuments,
  getSignatories,
  getEndpoints,
  getProspectId
} from "../../store/selectors/appConfig";
import { UploadDocument } from "./UploadDocument";
import { retrieveDocDetails, docUploadSuccess } from "../../store/actions/getProspectDocuments";
import { getInputValueById } from "../../store/selectors/input";

const mapStateToProps = state => ({
  documents: getProspectDocuments(state),
  companyName: getInputValueById(state, "Org.companyName"),
  getSignatories: getSignatories(state),
  uploadDocsEndpoints: getEndpoints(state),
  prospectID: getProspectId(state)
});

const mapDispatchToProps = {
  retrieveDocDetails,
  docUploadSuccess
};

export const UploadDocuments = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocument);

import { connect } from "react-redux";

import {
  getProspectDocuments,
  getEndpoints,
  getProspectId,
  getSignatories
} from "../../../../store/selectors/appConfig";
import { DocumentsComponent } from "./Documents";
import { downloadDocumentFile } from "../../../../store/actions/getProspectDocuments";

const mapStateToProps = state => ({
  docs: getProspectDocuments(state),
  endpointsUrl: getEndpoints(state),
  prospectId: getProspectId(state),
  signatoryInfo: getSignatories(state)
});

const mapDispatchToProps = {
  downloadDocumentFile
};

export const Documents = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsComponent);

import { connect } from "react-redux";

import {
  getOverviewDocuments,
  getProspectOverviewId,
  getOverviewSignatories
} from "../../../../store/selectors/searchProspect";
import { DocumentsComponent } from "./Documents";
import { downloadDocumentFile } from "../../../../store/actions/uploadDocuments";

const mapStateToProps = state => ({
  docs: getOverviewDocuments(state),
  prospectId: getProspectOverviewId(state),
  signatoryInfo: getOverviewSignatories(state)
});

const mapDispatchToProps = {
  downloadDocumentFile
};

export const Documents = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsComponent);

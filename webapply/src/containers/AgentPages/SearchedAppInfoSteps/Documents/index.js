import { connect } from "react-redux";

import { getEndpoints } from "../../../../store/selectors/appConfig";
import {
  getOverviewDocuments,
  getProspectOverviewId,
  getOverviewSignatories
} from "../../../../store/selectors/searchProspect";
import { DocumentsComponent } from "./Documents";
import { downloadDocumentFile } from "../../../../store/actions/getProspectDocuments";

const mapStateToProps = state => ({
  endpointsUrl: getEndpoints(state),
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

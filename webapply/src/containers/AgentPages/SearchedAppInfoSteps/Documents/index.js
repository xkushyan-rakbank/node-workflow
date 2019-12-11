import { connect } from "react-redux";

import { getProspectDocuments, getEndpoints } from "../../../../store/selectors/appConfig";
import { DocumentsComponent } from "./Documents";

const mapStateToProps = state => ({
  docs: getProspectDocuments(state),
  endpointsUrl: getEndpoints(state)
});

export const Documents = connect(mapStateToProps)(DocumentsComponent);

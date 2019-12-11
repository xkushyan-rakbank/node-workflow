import { connect } from "react-redux";

import * as appConfigSelector from "../../../../store/selectors/appConfig";
import { DocumentsComponent } from "./Documents";

const mapStateToProps = state => ({
  docs: appConfigSelector.getProspectDocuments(state),
  endpointsUrl: appConfigSelector.getEndpoints(state)
});

export const Documents = connect(mapStateToProps)(DocumentsComponent);

import { connect } from "react-redux";

import { updateProspectId, resetProspect } from "../../../store/actions/appConfig";
import { getProspectInfoPromisify } from "../../../store/actions/retrieveApplicantInfo";
import {
  getSearchResults,
  getProspectOverview,
  getFilledOverviewSignatories
} from "../../../store/selectors/searchProspect";
import { getProspectOverviewPromisify } from "../../../store/actions/searchProspect";
import { SearchedAppInfoContainer } from "./SearchedAppInfo";
import { getDocumentsList } from "../../../store/actions/uploadDocuments";

const mapStateToProps = state => ({
  searchResults: getSearchResults(state),
  prospectOverview: getProspectOverview(state),
  signatoryInfo: getFilledOverviewSignatories(state)
});

const mapDispatchToProps = {
  getProspectOverview: getProspectOverviewPromisify,
  getProspectInfo: getProspectInfoPromisify,
  getDocumentsList,
  updateProspectId,
  resetProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchedAppInfoContainer);

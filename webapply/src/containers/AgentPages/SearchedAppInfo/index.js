import { connect } from "react-redux";

import { updateProspectId, resetProspect } from "../../../store/actions/appConfig";
import { getProspectInfoPromisify } from "../../../store/actions/retrieveApplicantInfo";
import { getSearchResults, getProspectOverview } from "../../../store/selectors/searchProspect";
import { getProspectOverviewPromisify } from "../../../store/actions/searchProspect";
import { SearchedAppInfoComponent } from "./SearchedAppInfo";

const mapStateToProps = state => ({
  searchResults: getSearchResults(state),
  prospectOverview: getProspectOverview(state)
});

const mapDispatchToProps = {
  getProspectOverview: getProspectOverviewPromisify,
  getProspectInfo: getProspectInfoPromisify,
  updateProspectId,
  resetProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchedAppInfoComponent);

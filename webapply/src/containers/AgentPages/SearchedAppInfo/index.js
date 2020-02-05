import { connect } from "react-redux";

import { updateProspectId, displayScreenBasedOnViewId } from "../../../store/actions/appConfig";
import { getProspectInfo } from "../../../store/actions/retrieveApplicantInfo";
import { retrieveDocDetails } from "../../../store/actions/getProspectDocuments";
import { getSearchResult } from "../../../store/selectors/searchProspect";
import { SearchedAppInfoComponent } from "./SearchedAppInfo";

const mapStateToProps = state => ({
  searchResults: getSearchResult(state)
});

const mapDispatchToProps = {
  retrieveDocDetails,
  getProspectInfo,
  updateProspectId,
  displayScreenBasedOnViewId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchedAppInfoComponent);

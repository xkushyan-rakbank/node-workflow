import { connect } from "react-redux";

import { updateProspectId } from "../../../store/actions/appConfig";
import { getProspectInfo, getScreenByViewID } from "../../../store/actions/retrieveApplicantInfo";
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
  getScreenByViewID
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchedAppInfoComponent);

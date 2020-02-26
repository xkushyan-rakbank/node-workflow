import { connect } from "react-redux";

import { updateProspectId } from "../../../store/actions/appConfig";
import { getProspectInfoPromisify } from "../../../store/actions/retrieveApplicantInfo";
import { retrieveDocDetails } from "../../../store/actions/getProspectDocuments";
import { getSearchResults } from "../../../store/selectors/searchProspect";
import { getProspect } from "../../../store/selectors/appConfig";
import { SearchedAppInfoComponent } from "./SearchedAppInfo";

const mapStateToProps = state => ({
  searchResults: getSearchResults(state),
  prospectInfo: getProspect(state)
});

const mapDispatchToProps = {
  retrieveDocDetails,
  getProspectInfo: getProspectInfoPromisify,
  updateProspectId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchedAppInfoComponent);

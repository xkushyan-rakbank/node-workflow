import { connect } from "react-redux";
import { searchApplications } from "../../../store/actions/searchProspect";
import { resetProspect } from "../../../store/actions/appConfig";
import { SearchProspectPage } from "./SearchProspectPage";
import {
  getSearchResults,
  getIsLoadingSearchProspects
} from "../../../store/selectors/searchProspect";

const mapStateToProps = state => ({
  searchResults: getSearchResults(state),
  isLoading: getIsLoadingSearchProspects(state)
});

const mapDispatchToProps = {
  searchApplications,
  resetProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProspectPage);

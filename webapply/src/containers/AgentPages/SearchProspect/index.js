import { connect } from "react-redux";
import { searchApplications } from "../../../store/actions/searchProspect";
import { SearchProspectComponent } from "./SearchProspect";
import {
  getSearchResults,
  getIsLoadingSearchProspects
} from "../../../store/selectors/searchProspect";

const mapStateToProps = state => ({
  searchResults: getSearchResults(state),
  isLoading: getIsLoadingSearchProspects(state)
});

const mapDispatchToProps = {
  searchApplications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProspectComponent);

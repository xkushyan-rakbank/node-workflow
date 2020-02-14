import { connect } from "react-redux";

import { searchApplications } from "../../../store/actions/searchProspect";
import { SearchProspectComponent } from "./SearchProspect";
import {
  getSearchResult,
  getIsLoadingSearchProspects
} from "../../../store/selectors/searchProspect";

const mapStateToProps = state => ({
  searchResults: getSearchResult(state),
  isLoading: getIsLoadingSearchProspects(state)
});

const mapDispatchToProps = {
  searchApplications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProspectComponent);

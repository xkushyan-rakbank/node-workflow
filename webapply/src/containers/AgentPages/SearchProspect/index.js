import { connect } from "react-redux";

import { searchApplications } from "../../../store/actions/searchProspect";
import { SearchProspectComponent } from "./SearchProspect";
import { getSearchResult } from "../../../store/selectors/searchProspect";

const mapStateToProps = state => ({
  searchResults: getSearchResult(state)
});

const mapDispatchToProps = {
  searchApplications
};

export const SearchProspect = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProspectComponent);

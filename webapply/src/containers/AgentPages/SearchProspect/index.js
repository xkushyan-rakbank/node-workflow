import { connect } from "react-redux";
import { searchApplications } from "../../../store/actions/searchProspect";
import { resetProspect } from "../../../store/actions/appConfig";
import { SearchProspectPage } from "./SearchProspectPage";
import {
  getSearchResults,
  getIsLoadingSearchProspects,
  getSearchError,
  getSearchErrorDesc
} from "../../../store/selectors/searchProspect";
import { getDatalist } from "../../../store/selectors/appConfig";
import { getRoCode } from "../../../store/selectors/loginSelector";

const mapStateToProps = state => ({
  searchResults: getSearchResults(state),
  isLoading: getIsLoadingSearchProspects(state),
  searchError: getSearchError(state),
  searchErrorDesc: getSearchErrorDesc(state),
  dataList: getDatalist(state),
  roCode: getRoCode(state)
});

const mapDispatchToProps = {
  searchApplications,
  resetProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProspectPage);

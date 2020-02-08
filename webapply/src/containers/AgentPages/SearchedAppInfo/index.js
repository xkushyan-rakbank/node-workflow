import { connect } from "react-redux";

import { updateProspectId } from "../../../store/actions/appConfig";
import { getProspectInfo } from "../../../store/actions/retrieveApplicantInfo";
import { retrieveDocDetails } from "../../../store/actions/getProspectDocuments";
import {
  getIsEditableStatusSearchInfo,
  getSearchResult
} from "../../../store/selectors/searchProspect";
import { getProspect } from "../../../store/selectors/appConfig";
import { SearchedAppInfoComponent } from "./SearchedAppInfo";
import { setIsApplyEditApplication } from "../../../store/actions/searchProspect";

const mapStateToProps = state => ({
  searchResults: getSearchResult(state),
  isApplyEditApplication: getIsEditableStatusSearchInfo(state),
  prospectInfo: getProspect(state)
});

const mapDispatchToProps = {
  retrieveDocDetails,
  getProspectInfo,
  updateProspectId,
  setIsApplyEditApplication
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchedAppInfoComponent);

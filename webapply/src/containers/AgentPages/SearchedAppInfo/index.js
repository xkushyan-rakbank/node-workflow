import { connect } from "react-redux";

import { updateProspectId } from "../../../store/actions/appConfig";
import { getProspectInfoPromisify } from "../../../store/actions/retrieveApplicantInfo";
import { retrieveDocDetails } from "../../../store/actions/getProspectDocuments";
import {
  getIsEditableStatusSearchInfo,
  getSearchResult
} from "../../../store/selectors/searchProspect";
import { getProspect, getSendProspectToAPIInfo } from "../../../store/selectors/appConfig";
import { SearchedAppInfoComponent } from "./SearchedAppInfo";
import { setIsApplyEditApplication } from "../../../store/actions/searchProspect";

const mapStateToProps = state => ({
  searchResults: getSearchResult(state),
  isApplyEditApplication: getIsEditableStatusSearchInfo(state),
  prospectInfo: getProspect(state),
  screeningResults: getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  retrieveDocDetails,
  getProspectInfo: getProspectInfoPromisify,
  updateProspectId,
  setIsApplyEditApplication
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchedAppInfoComponent);

import { connect } from "react-redux";

import { getAuthToken, getExpired } from "../../store/selectors/appConfig";
import { getUploadDocuments } from "../../store/selectors/uploadDocuments";
import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { logout } from "../../store/actions/loginForm";
import { setAccessToken } from "../../store/actions/appConfig";
import { SessionExpiration } from "./SessionExpiration";
import { getwtmSessionDetails } from "../../store/selectors/webToMobile";

const mapStateToProps = state => ({
  expired: getExpired(state),
  authToken: getAuthToken(state),
  isAuthenticated: checkLoginStatus(state),
  uploadDocuments: getUploadDocuments(state),
  webToMobile: getwtmSessionDetails(state)
});

const mapDispatchToProps = {
  logout,
  setAccessToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionExpiration);

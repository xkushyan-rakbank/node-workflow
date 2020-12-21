import { connect } from "react-redux";

import { getAuthToken, getExpired } from "../../store/selectors/appConfig";
import { getUploadDocuments } from "../../store/selectors/uploadDocuments";
import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { logout } from "../../store/actions/loginForm";
import { setAccessToken } from "../../store/actions/appConfig";
import { SessionExpiration } from "./SessionExpiration";

const mapStateToProps = state => ({
  expired: getExpired(state),
  authToken: getAuthToken(state),
  isAuthenticated: checkLoginStatus(state),
  uploadDocuments: getUploadDocuments(state)
});

const mapDispatchToProps = {
  logout,
  setAccessToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionExpiration);

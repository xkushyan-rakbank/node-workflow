import { connect } from "react-redux";

import { getAuthToken } from "../../store/selectors/appConfig";
import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { logout } from "../../store/actions/loginForm";
import { setAccessToken } from "../../store/actions/appConfig";
import { SessionExpiration } from "./SessionExpiration";

const mapStateToProps = state => ({
  authToken: getAuthToken(state),
  isAuthenticated: checkLoginStatus(state)
});

const mapDispatchToProps = {
  logout,
  setAccessToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionExpiration);

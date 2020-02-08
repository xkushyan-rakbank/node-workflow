import { connect } from "react-redux";

import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { FormNavigationComponent } from "./FormNavigation";
import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";
import { getIsEditableStatusSearchInfo } from "../../store/selectors/searchProspect";

const mapStateToProps = state => ({
  islamicBanking: getIsIslamicBanking(state),
  accountType: getAccountType(state),
  isLogin: checkLoginStatus(state),
  isApplyEditApplication: getIsEditableStatusSearchInfo(state)
});

export const FormNavigation = connect(mapStateToProps)(FormNavigationComponent);

import { connect } from "react-redux";

import { getErrorCode } from "../../store/selectors/searchProspect";
import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";
import { getScreeningError } from "../../store/selectors/sendProspectToAPI";
import { FormLayoutContainer } from "./FormLayout";

const mapStateToProps = state => ({
  screeningError: getScreeningError(state),
  accountType: getAccountType(state),
  isIslamicBanking: getIsIslamicBanking(state),
  errorCode: getErrorCode(state)
});

export const FormLayout = connect(mapStateToProps)(FormLayoutContainer);

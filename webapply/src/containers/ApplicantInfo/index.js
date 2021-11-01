import { connect } from "react-redux";

import {
  getAccountType,
  getDatalist,
  getIsIslamicBanking,
  getIsRecaptchaEnable,
  getReCaptchaSiteKey,
  getRoCode,
  getIsLemniskEnable
} from "../../store/selectors/appConfig";
import { resetScreeningError } from "../../store/actions/sendProspectToAPI";
import { receiveAppConfig } from "../../store/actions/appConfig";
import { applicantInfoFormPromisify } from "../../store/actions/applicantInfoForm";
import { setToken } from "../../store/actions/reCaptcha";
import { getReCaptchaToken } from "../../store/selectors/reCaptcha";

import { ApplicantInfoContainer } from "./ApplicantInfo";

const mapStateToProps = state => ({
  reCaptchaToken: getReCaptchaToken(state),
  isConfigLoading: state.appConfig.loading,
  isRecaptchaEnable: getIsRecaptchaEnable(state),
  reCaptchaSiteKey: getReCaptchaSiteKey(state),
  accountType: getAccountType(state),
  isIslamicBanking: getIsIslamicBanking(state),
  dataList: getDatalist(state),
  roCode: getRoCode(state),
  isLemniskEnable: getIsLemniskEnable(state)
});

const mapDispatchToProps = {
  resetScreeningError,
  receiveAppConfig,
  submit: applicantInfoFormPromisify,
  setToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantInfoContainer);

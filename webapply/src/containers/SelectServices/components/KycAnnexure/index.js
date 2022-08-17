import { get } from "lodash";
import { connect } from "react-redux";

import {
  getAccountInfo,
  getIsIslamicBanking,
  getOrganizationInfo,
  getKycAnnexureDetails,
  getDatalist
} from "../../../../store/selectors/appConfig";

import { KycAnnexureComponent } from "./KycAnnexure";

//ro-assist-brd3-17
const mapStateToProps = state => ({
  islamicBanking: getIsIslamicBanking(state),
  isExpress: get(getAccountInfo(state)[0], "express", ""),
  organizationInfo: getOrganizationInfo(state),
  kycAnnexureDetails: getKycAnnexureDetails(state),
  kycAnnexureBankDetails: get(getKycAnnexureDetails(state), "bankDetails"),
  datalist: getDatalist(state)
});

export const KycAnnexure = connect(mapStateToProps)(KycAnnexureComponent);

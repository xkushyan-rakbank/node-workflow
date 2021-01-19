import { get } from "lodash";
import { connect } from "react-redux";

import { getAccountInfo, getIsIslamicBanking } from "../../../../store/selectors/appConfig";

import { AccountDetailsComponent } from "./AccountDetails";

//ro-assist-brd3-17
const mapStateToProps = state => ({
  islamicBanking: getIsIslamicBanking(state),
  isExpress: get(getAccountInfo(state)[0], "express", "")
});

export const AccountDetails = connect(mapStateToProps)(AccountDetailsComponent);

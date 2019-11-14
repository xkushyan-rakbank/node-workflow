import get from "lodash/get";
import { compose } from "redux";
import { connect } from "react-redux";

import { AccountDetails } from "./AccountDetails";
import { getInputValueById, getFieldConfigById } from "../../../../store/selectors/input";

const mapStateToProps = state => ({
  islamicBanking: get(state.appConfig, "prospect.applicationInfo.islamicBanking"),
  branchCityValue: getInputValueById(state, "Org.branchCity", [0, 0]),
  branchCityConfig: getFieldConfigById(state, "Org.branchCity")
});

export default compose(connect(mapStateToProps))(AccountDetails);

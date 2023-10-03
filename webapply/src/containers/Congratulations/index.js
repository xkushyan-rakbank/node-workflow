import { connect } from "react-redux";

import { CongratulationsScreen } from "./CongratulationsScreen";
import { getTat } from "../../store/selectors/appConfig";

const mapStateToProps = state => ({
  TAT: getTat(state)
});

export default connect(mapStateToProps)(CongratulationsScreen);

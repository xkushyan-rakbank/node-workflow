import { connect } from "react-redux";

import { getAccountNumbers } from "../../store/selectors/accountNumbers";
import { getCompanyName } from "../../store/selectors/appConfig";
import { ApplicationSubmittedContainer } from "./ApplicationSubmitted";

const mapStateToProps = state => ({
  accountNumbers: getAccountNumbers(state),
  companyName: getCompanyName(state)
});

export default connect(mapStateToProps)(ApplicationSubmittedContainer);

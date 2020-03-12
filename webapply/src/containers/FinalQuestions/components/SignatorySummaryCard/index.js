import { connect } from "react-redux";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";
import { getDatalist } from "../../../../store/selectors/appConfig";
import { SignatorySummaryCardComponent } from "./SignatorySummaryCard";

const mapStateToProps = state => ({
  datalist: getDatalist(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

export const SignatorySummaryCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatorySummaryCardComponent);

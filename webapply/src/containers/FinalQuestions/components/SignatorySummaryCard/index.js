import { connect } from "react-redux";
import { sendProspectToAPI } from "../../../../store/actions/sendProspectToAPI";
import { getSendProspectToAPIInfo } from "../../../../store/selectors/appConfig";
import { SignatorySummaryCardComponent } from "./SignatorySummaryCard";

const mapStateToProps = state => ({
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI
};

export const SignatorySummaryCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatorySummaryCardComponent);

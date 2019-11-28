import { connect } from "react-redux";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";
import { getInputValueById } from "../../../../store/selectors/input";
import { getSendProspectToAPIInfo } from "../../../../store/selectors/appConfig";
import { CompanySummaryCardComponent } from "./CompanySummaryCard";

const mapStateToProps = state => ({
  companyName: getInputValueById(state, "Org.companyName"),
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

export const CompanySummaryCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanySummaryCardComponent);

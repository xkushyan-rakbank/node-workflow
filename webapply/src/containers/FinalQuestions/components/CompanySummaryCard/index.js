import { sendProspectToAPI } from "../../../../store/actions/sendProspectToAPI";
import { getInputValueById } from "../../../../store/selectors/input";
import { connect } from "react-redux";
import { getSendProspectToAPIInfo } from "../../../../store/selectors/appConfig";
import { CompanySummaryCardComponent } from "./CompanySummaryCard";

const mapStateToProps = state => ({
  companyName: getInputValueById(state, "Org.companyName"),
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI
};

export const CompanySummaryCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanySummaryCardComponent);

import { connect } from "react-redux";

import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";
import { getOrganizationInfo } from "../../../../store/selectors/appConfig";
import { CompanySummaryCardComponent } from "./CompanySummaryCard";

const mapStateToProps = state => ({
  companyName: getOrganizationInfo(state).companyName
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

export const CompanySummaryCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanySummaryCardComponent);

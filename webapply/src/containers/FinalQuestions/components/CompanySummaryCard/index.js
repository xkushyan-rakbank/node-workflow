import { connect } from "react-redux";
import get from "lodash/get";

import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";
import { getOrganizationInfo } from "../../../../store/selectors/appConfig";
import { getSendProspectToAPIInfo } from "../../../../store/selectors/appConfig";
import { CompanySummaryCardComponent } from "./CompanySummaryCard";

const mapStateToProps = state => ({
  companyName: get(getOrganizationInfo(state), "companyName", ""),
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

export const CompanySummaryCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanySummaryCardComponent);

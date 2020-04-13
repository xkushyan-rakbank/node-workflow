import { connect } from "react-redux";

import { getFilledOverviewSignatories } from "../../../../../store/selectors/searchProspect";
import {
  getCompanyChecks,
  getOrganizationScreeningResults
} from "../../../../../store/selectors/screeningResults";
import { CheckListComponent } from "./CheckList";

const mapStateToProps = state => ({
  signatoryInfo: getFilledOverviewSignatories(state),
  companyChecks: getCompanyChecks(state),
  companyInfo: getOrganizationScreeningResults(state)
});

export const CheckList = connect(mapStateToProps)(CheckListComponent);

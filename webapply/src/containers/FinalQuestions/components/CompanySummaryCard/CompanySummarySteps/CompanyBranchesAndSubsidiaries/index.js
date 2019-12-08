import { connect } from "react-redux";
import get from "lodash/get";

import { updateProspect } from "../../../../../../store/actions/appConfig";
import { getOrgKYCDetails } from "../../../../../../store/selectors/appConfig";
import { CompanyBranchesAndSubsidiariesComponent } from "./CompanyBranchesAndSubsidiaries";
import { initialEntitiesInUAE, initialEntitiesOutsideUAE } from "./constants";

const mapStateToProps = state => ({
  entitiesInUAE: get(getOrgKYCDetails(state), "entitiesInUAE", initialEntitiesInUAE),
  entitiesOutsideUAE: get(getOrgKYCDetails(state), "entitiesOutsideUAE", initialEntitiesOutsideUAE)
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyBranchesAndSubsidiaries = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyBranchesAndSubsidiariesComponent);

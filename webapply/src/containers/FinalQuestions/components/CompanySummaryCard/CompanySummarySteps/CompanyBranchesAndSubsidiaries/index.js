import { connect } from "react-redux";
import get from "lodash/get";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { getOrgKYCDetails } from "../../../../../../store/selectors/appConfig";
import { CompanyBranchesAndSubsidiariesComponent } from "./CompanyBranchesAndSubsidiaries";
import { prospect } from "../../../../../../constants/config";

const mapStateToProps = state => ({
  entitiesInUAE: get(
    getOrgKYCDetails(state),
    "entitiesInUAE",
    prospect.orgKYCDetails.entitiesInUAE
  ),
  entitiesOutsideUAE: get(
    getOrgKYCDetails(state),
    "entitiesOutsideUAE",
    prospect.orgKYCDetails.entitiesOutsideUAE
  )
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyBranchesAndSubsidiaries = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyBranchesAndSubsidiariesComponent);

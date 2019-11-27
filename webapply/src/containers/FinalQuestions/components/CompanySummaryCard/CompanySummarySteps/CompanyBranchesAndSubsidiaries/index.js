import { connect } from "react-redux";
import get from "lodash/get";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { getOrgKYCDetails } from "../../../../../../store/selectors/appConfig";
import { CompanyBusinessRelationshipsComponent } from "./CompanyBranchesAndSubsidiaries";
import { prospect } from "../../../../../../constants/config";

const mapStateToProps = state => ({
  entitiesInUAE: get(
    getOrgKYCDetails(state),
    "entitiesInUAE",
    prospect.orgKYCDetails.entitiesInUAE
  ),
  otherEntitiesInUAE: get(
    getOrgKYCDetails(state),
    "otherEntitiesInUAE",
    prospect.orgKYCDetails.otherEntitiesInUAE
  ),
  entitiesOutsideUAE: get(
    getOrgKYCDetails(state),
    "entitiesOutsideUAE",
    prospect.orgKYCDetails.entitiesOutsideUAE
  ),
  otherEntitiesOutsideUAE: get(
    getOrgKYCDetails(state),
    "otherEntitiesOutsideUAE",
    prospect.orgKYCDetails.otherEntitiesOutsideUAE
  )
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyBranchesAndSubsidiaries = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyBusinessRelationshipsComponent);

import { connect } from "react-redux";
import get from "lodash/get";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { getOrgKYCDetails } from "../../../../../../store/selectors/appConfig";
import { CompanyBusinessRelationshipsComponent } from "./CompanyBranchesAndSubsidiaries";

const mapStateToProps = state => ({
  entitiesInUAE: get(getOrgKYCDetails(state), "entitiesInUAE", [
    { companyName: "", emirate: "", tradeLicenseNo: "" }
  ]),
  otherEntitiesInUAE: get(getOrgKYCDetails(state), "otherEntitiesInUAE", false),
  entitiesOutsideUAE: get(getOrgKYCDetails(state), "entitiesOutsideUAE", [
    { companyName: "", country: "" }
  ]),
  otherEntitiesOutsideUAE: get(getOrgKYCDetails(state), "otherEntitiesOutsideUAE", false)
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyBranchesAndSubsidiaries = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyBusinessRelationshipsComponent);

import { connect } from "react-redux";
import get from "lodash/get";
import { getOrgKYCDetails } from "../../../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { CompanyBusinessRelationshipsComponent } from "./CompanyBusinessRelationships";

const mapStateToProps = state => ({
  topCustomers: get(getOrgKYCDetails(state), "topCustomers", [{ name: "", country: "" }]),
  topSuppliers: get(getOrgKYCDetails(state), "topSuppliers", [{ name: "", country: "" }]),
  topOriginGoodsCountries: get(getOrgKYCDetails(state), "topOriginGoodsCountries", [""]),
  otherBankDetails: get(getOrgKYCDetails(state), "otherBankingRelationshipsInfo.otherBankDetails", [
    { bankName: "" }
  ])
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyBusinessRelationships = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyBusinessRelationshipsComponent);

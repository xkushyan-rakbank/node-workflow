import { getOrgKYCDetails } from "../../../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { CompanyBusinessRelationshipsComponent } from "./CompanyBusinessRelationships";
import get from "lodash/get";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  topCustomers: get(getOrgKYCDetails(state), "topCustomers", [{ name: "", country: "" }]),
  topSuppliers: get(getOrgKYCDetails(state), "topSuppliers", [{ name: "", country: "" }]),
  topOriginGoodsCountries: get(getOrgKYCDetails(state), "topOriginGoodsCountries", [""]),
  otherBankingRelationshipsExist: get(
    getOrgKYCDetails(state),
    "otherBankingRelationshipsInfo.otherBankingRelationshipsExist",
    false
  ),
  isDontHaveSuppliersYet: get(getOrgKYCDetails(state), "isDontHaveSuppliersYet", false),
  isDontTradeGoodsYet: get(getOrgKYCDetails(state), "isDontTradeGoodsYet", false),
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

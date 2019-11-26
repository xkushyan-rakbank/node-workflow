import { connect } from "react-redux";
import get from "lodash/get";
import { getOrgKYCDetails } from "../../../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { CompanyBusinessRelationshipsComponent } from "./CompanyBusinessRelationships";
import { initialValues } from "./constants";

const mapStateToProps = state => ({
  topCustomers: get(getOrgKYCDetails(state), "topCustomers", initialValues.topCustomers),
  topSuppliers: get(getOrgKYCDetails(state), "topSuppliers", initialValues.topSuppliers),
  topOriginGoodsCountries: get(
    getOrgKYCDetails(state),
    "topOriginGoodsCountries",
    initialValues.topOriginGoodsCountries
  ),
  otherBankingRelationshipsExist: get(
    getOrgKYCDetails(state),
    "otherBankingRelationshipsInfo.otherBankingRelationshipsExist",
    initialValues.otherBankingRelationshipsExist
  ),
  isDontHaveSuppliersYet: get(
    getOrgKYCDetails(state),
    "isDontHaveSuppliersYet",
    initialValues.isDontHaveSuppliersYet
  ),
  isDontTradeGoodsYet: get(
    getOrgKYCDetails(state),
    "isDontTradeGoodsYet",
    initialValues.isDontTradeGoodsYet
  ),
  otherBankDetails: get(getOrgKYCDetails(state), "otherBankingRelationshipsInfo.otherBankDetails", [
    initialValues.otherBankDetails
  ])
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyBusinessRelationships = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyBusinessRelationshipsComponent);

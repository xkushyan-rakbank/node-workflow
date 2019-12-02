import { connect } from "react-redux";
import get from "lodash/get";
import { getOrgKYCDetails } from "../../../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { CompanyBusinessRelationshipsComponent } from "./CompanyBusinessRelationships";
import {
  initialOtherBankDetails,
  initialTopOriginGoodsCountries,
  initialTopSuppliers,
  initialTopCustomers
} from "./constants";

const mapStateToProps = state => ({
  topCustomers: get(getOrgKYCDetails(state), "topCustomers", initialTopCustomers),
  topSuppliers: get(getOrgKYCDetails(state), "topSuppliers", initialTopSuppliers),
  topOriginGoodsCountries: get(
    getOrgKYCDetails(state),
    "topOriginGoodsCountries",
    initialTopOriginGoodsCountries
  ),
  otherBankDetails: get(
    getOrgKYCDetails(state),
    "otherBankingRelationshipsInfo.otherBankDetails",
    initialOtherBankDetails
  )
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyBusinessRelationships = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyBusinessRelationshipsComponent);

import { connect } from "react-redux";
import get from "lodash/get";
import { getOrganizationInfo } from "../../../../../../store/selectors/appConfig";
import  { CompanyPreferredMailingAddressComponent } from "./CompanyPreferredMailingAddress";

const mapStateToProps = state => ({
    organisationCountry: get(
      getOrganizationInfo(state),
      "addressInfo[0].addressDetails[0].country",
      ""
    ),
    organisationAddressLine1: get(
      getOrganizationInfo(state),
      "addressInfo[0].addressDetails[0].addressLine1",
      ""
    ),
    organisationEmirateCity: get(
      getOrganizationInfo(state),
      "addressInfo[0].addressDetails[0].emirateCity",
      ""
    ),
    organisationPoBox: get(getOrganizationInfo(state), "addressInfo[0].addressDetails[0].poBox", "")
  });

  export const CompanyPreferredMailingAddress = connect(mapStateToProps)(
    CompanyPreferredMailingAddressComponent
  );

import { connect } from "react-redux";
import get from "lodash/get";

import { AddCompanyInformation } from "./AdditionalCompanyInformation";
import { getCompanyAdditionalInfo, getCompanyName } from "../../../../store/selectors/appConfig";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";

const initialCustomers = [{ name: "", country: "" }];

const mapStateToProps = state => ({
  companyName: getCompanyName(state),
  topCustomers: get(getCompanyAdditionalInfo(state), "topCustomers", initialCustomers),
  topSuppliers: get(getCompanyAdditionalInfo(state), "topSuppliers", initialCustomers)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

const CompanyInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCompanyInformation);

export default CompanyInformation;

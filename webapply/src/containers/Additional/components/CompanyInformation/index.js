import { connect } from "react-redux";

import { AddCompanyInformation } from "./AdditionalCompanyInformation";
import { getCompanyName } from "../../../../store/selectors/appConfig";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";

const mapStateToProps = state => ({
  companyName: getCompanyName(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

const CompanyInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCompanyInformation);

export default CompanyInformation;

import { connect } from "react-redux";
import get from "lodash/get";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { SignatorySourceOfFundsComponent } from "./SignatorySourceOfFunds";
import { prospect } from "../../../../../../constants/config";
import { getSignatories } from "../../../../../../store/selectors/appConfig";

const mapStateToProps = (state, { index }) => ({
  wealthType: get(
    getSignatories(state)[index],
    "kycDetails.sourceOfWealth.wealthType",
    prospect.signatoryInfo[0].kycDetails.sourceOfWealth.wealthType
  ),
  others: get(
    getSignatories(state)[index],
    "kycDetails.sourceOfWealth.others",
    prospect.signatoryInfo[0].kycDetails.sourceOfWealth.others
  )
});

const mapDispatchToProps = {
  updateProspect
};

export const SignatorySourceOfFunds = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatorySourceOfFundsComponent);

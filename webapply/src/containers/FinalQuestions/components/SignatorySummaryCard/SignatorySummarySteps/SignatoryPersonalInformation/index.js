import { connect } from "react-redux";
import get from "lodash/get";
import { getSignatories } from "../../../../../../store/selectors/appConfig";
import { SignatoryPersonalInformationComponent } from "./SignatoryPersonalInformation";
import { prospect } from "../../../../../../constants/config";

const mapStateToProps = (state, { index }) => ({
  maritalStatus: get(
    getSignatories(state)[index],
    "maritalStatus",
    prospect.signatoryInfo[0].maritalStatus
  ),
  mothersMaidenName: get(
    getSignatories(state)[index],
    "mothersMaidenName",
    prospect.signatoryInfo[0].mothersMaidenName
  ),
  maritalStatusOthers: get(
    getSignatories(state)[index],
    "maritalStatusOthers",
    prospect.signatoryInfo[0].maritalStatusOthers
  )
});

export const SignatoryPersonalInformation = connect(mapStateToProps)(
  SignatoryPersonalInformationComponent
);

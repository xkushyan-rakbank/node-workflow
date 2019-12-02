import { connect } from "react-redux";
import get from "lodash/get";

import { updateProspect } from "../../../../../../store/actions/appConfig";
import { CompanyPreferredContactInformationComponent } from "./CompanyPreferredContactInformation";
import { getOrganizationInfo, getAccountInfo } from "../../../../../../store/selectors/appConfig";
import {
  INITIAL_PRIMARY_PHONE_NUMBER,
  FIRST_ARRAY_INDEX,
  INITIAL_PRIMARY_CHEQUE_BOOK_APPLIED
} from "./constants";

const mapStateToProps = state => ({
  primaryPhoneNo: get(
    getOrganizationInfo(state),
    "contactDetails.primaryPhoneNo",
    INITIAL_PRIMARY_PHONE_NUMBER
  ),
  chequeBookApplied: get(
    getAccountInfo(state)[FIRST_ARRAY_INDEX],
    "chequeBookApplied",
    INITIAL_PRIMARY_CHEQUE_BOOK_APPLIED
  )
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyPreferredContactInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyPreferredContactInformationComponent);

import { handleActions } from "../../utils/redux-utils";
import {
  UPDATE_COMPANY_ADDITIONAL_INFO_STATUS,
  UPDATE_STAKEHOLDER_INFO_STATUS
} from "../actions/additionalInfo";

// Initial state
const initialState = {
  companyAdditionalInfoStatus: "",
  addionalStakeholderInfoStatus: ""
};

export default handleActions(
  {
    [UPDATE_COMPANY_ADDITIONAL_INFO_STATUS]: (state, { payload }) => ({
      ...state,
      companyAdditionalInfoStatus: payload
    }),
    [UPDATE_STAKEHOLDER_INFO_STATUS]: (state, { payload }) => ({
      ...state,
      addionalStakeholderInfoStatus: payload
    })
  },
  initialState
);

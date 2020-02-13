import { CompanyDetails } from "../SearchedAppInfoSteps/CompanyDetails";
import { AuditTrail } from "../SearchedAppInfoSteps/AuditTrail";
import { Documents } from "../SearchedAppInfoSteps/Documents";
import { CheckList } from "../SearchedAppInfoSteps/CheckList";

export const CONFIRM_MESSAGE =
  "Editing the application will result in re-performing the pre-screening checks and might change the results.";

export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;
export const STEP_4 = 4;

export const STATUS_LOCKED = "locked";
export const APP_STOP_SCREEN_RESULT = "stop";

export const searchedAppInfoSteps = [
  {
    step: STEP_1,
    title: "Details",
    component: CompanyDetails
  },
  {
    step: STEP_2,
    title: "Checks",
    component: CheckList
  },
  { step: STEP_3, title: "Documents", component: Documents },
  { step: STEP_4, title: "Audit Trail", component: AuditTrail }
];

import { CompanyDetails } from "../SearchedAppInfoSteps/CompanyDetails";
import { AuditTrail } from "../SearchedAppInfoSteps/AuditTrail";
import { Documents } from "../SearchedAppInfoSteps/Documents";
import { CheckList } from "../SearchedAppInfoSteps/CheckList";

export const disableArrayValues = ["Account activated", "Declined", "Ineligible"];

export const CONFIRM_MESSAGE =
  "Editing the application will result in re-performing the pre-screening checks and might change the results.";

export const searchedAppInfoSteps = [
  {
    step: 1,
    title: "Details",
    component: CompanyDetails
  },
  {
    step: 2,
    title: "Checks",
    component: CheckList
  },
  { step: 3, title: "Documents", component: Documents },
  { step: 4, title: "Audit Trail", component: AuditTrail }
];

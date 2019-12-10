import SearchedCompanyDetails from "../../../components/SearchedAppInfoSteps/CompanyDetails";
import AuditTrail from "../../../components/SearchedAppInfoSteps/AuditTrail";
import Documents from "../../../components/SearchedAppInfoSteps/Documents";
import CheckList from "../../../components/SearchedAppInfoSteps/CheckList";

export const disableArrayValues = ["Account activated", "Declined", "Ineligible"];

export const CONFIRM_MESSAGE =
  "Editing the application will result in re-performing the pre-screening checks and might change the results.";

export const searchedAppInfoSteps = [
  {
    step: 1,
    title: "Details",
    component: SearchedCompanyDetails
  },
  {
    step: 2,
    title: "Checks",
    component: CheckList
  },
  { step: 3, title: "Documents", component: Documents },
  { step: 4, title: "Audit Trail", component: AuditTrail }
];

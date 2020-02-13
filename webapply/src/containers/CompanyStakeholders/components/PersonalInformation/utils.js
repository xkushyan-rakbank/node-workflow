import { FULL_NAME_MAX_LENGTH } from "../../constants";

export function checkFullNameLength(firstName = "", middleName = "", lastName = "") {
  return middleName.length + lastName.length + firstName.length <= FULL_NAME_MAX_LENGTH;
}

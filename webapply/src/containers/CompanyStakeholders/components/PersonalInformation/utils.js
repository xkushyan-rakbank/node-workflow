import { MAX_LENGTH } from "../../constants";

export function checkStringLength(fullName) {
  if (fullName.length > MAX_LENGTH) {
    const extraLength = fullName.length - MAX_LENGTH;
    const [firstName, middleName, lastName] = fullName.split(" ");
    const reducedMiddleName = middleName.substring(0, middleName.length - extraLength - 1);

    return [firstName, reducedMiddleName, lastName].join(" ");
  } else {
    return fullName;
  }
}

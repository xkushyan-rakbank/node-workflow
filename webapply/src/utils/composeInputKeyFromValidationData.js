import routes from "../routes";

export function composeInputKeyFromValidationData(validationData) {
  const pathname = window.location.pathname;
  const replaced = validationData.fieldPath.replace("$.", "").replace("$", "");

  if (replaced.startsWith("prospect.")) {
    return replaced;
  } else if (pathname.includes(routes.login)) {
    return `login.${replaced}`;
  } else if (pathname.includes(routes.searchProspect)) {
    return `searchInfo.${replaced}`;
  } else {
    return `prospect.${replaced}`;
  }
}
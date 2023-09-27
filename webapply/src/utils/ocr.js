export const getOcrFieldValueBySource = node => {
  const nodeValue = node?.find(x => x?.source === "mrz" || x?.source === "visual");
  return nodeValue?.value || "";
};

export const removeEncodingPrefix = imgStr => imgStr.replace(/data:.*;base64,/, "");

export const checkDocumentSideValid = (optionalData, personalNumber) => {
  return optionalData === personalNumber.replaceAll("-", "");
};

export const checkDocumentValid = node => {
  if (node?.documentMismatch[0]?.value === "1") {
    return true;
  }
  return false;
};

export const checkIsDocTypePassport = node => {
  if (node?.documentTypeName[0]?.value === "passport") {
    return true;
  }
  return false;
};

export const checkIsDocTypeEid = node => {
  if (node?.documentTypeName[0]?.value === "eid") {
    return true;
  }
  return false;
};

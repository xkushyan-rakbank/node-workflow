export const getOcrFieldValueBySource = node => {
  let valueToFind = null;

  for (const item of node) {
    if (item.source === "mrz") {
      valueToFind = item.value;
      break;
    }
  }

  if (valueToFind === null) {
    for (const item of node) {
      if (item.source === "visual") {
        valueToFind = item.value;
        break;
      }
    }
  }
  return valueToFind || "";
};

export const removeEncodingPrefix = imgStr => imgStr.replace(/data:.*;base64,/, "");

export const checkDocumentSideValid = (optionalData, personalNumber) => {
  return optionalData === personalNumber.replaceAll("-", "");
};

export const checkDocumentValid = node => {
  if (node?.documentMismatch && node?.documentMismatch[0]?.value === "1") {
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

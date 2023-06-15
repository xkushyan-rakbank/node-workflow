export const getOcrFieldValueBySource = (node, source) => {
  return node?.find(x => x?.source === source)?.value || "";
};

export const removeEncodingPrefix = imgStr => imgStr.replace(/data:.*;base64,/, "");

export const checkDocumentSideValid = (optionalData, personalNumber) => {
  return optionalData === personalNumber.replaceAll("-", "");
};

export const checkDocumentValid = node => {
  if (node?.documentMismatch[0]?.value === "0") {
    return false;
  }
  return true;
};

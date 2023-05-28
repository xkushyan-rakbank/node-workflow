export const getOcrFieldValueBySource = (node, source) => {
  return node?.find(x => x?.source === source)?.value || "";
};

export const removeEncodingPrefix = imgStr => imgStr.replace(/data:.*;base64,/, "");

export const checkDocumentSideValid = node => {
  return node[0].value === "1";
};

export const checkDocumentValid = node => {
  if (!node?.documentNumber) {
    return false;
  }
  const isDifferentSide = checkDocumentSideValid(node?.documentMismatch);
  const documentNumber = node?.documentNumber[0]?.value;
  return isDifferentSide && node?.documentNumber.every(x => x?.value === documentNumber);
};

export const getOcrFieldValueBySource = (node, source) => {
  return node?.find(x => x?.source === source)?.value || "";
};

export const removeEncodingPrefix = imgStr => imgStr.replace(/data:.*;base64,/, "");

export const checkDocumentSideValid = (optionalData, personalNumber) => {
  return optionalData === personalNumber.replaceAll("-", "");
};

export const checkDocumentValid = node => {
  if (!node?.documentNumber) {
    return false;
  }
  const isDifferentSide = checkDocumentSideValid(
    node?.optionalData[0]?.value,
    node?.personalNumber[0]?.value
  );
  const documentNumber = node?.documentNumber[0]?.value;
  return isDifferentSide && node?.documentNumber.every(x => x?.value === documentNumber);
};

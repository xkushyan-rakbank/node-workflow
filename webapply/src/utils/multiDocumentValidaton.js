export const multiDocumentValidation = (docs, type, organizationInfo, orgKYCDetails) => {
  (docs || []).map((doc, index) => {
    let required = true;
    if (index === 0) {
      required = docs.required;
    } else {
      required = false;
    }
    doc.required = required;
    return { ...doc };
  });
  return docs;
};

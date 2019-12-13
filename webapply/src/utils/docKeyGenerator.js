export const docKeyGenerator = ({ signatoryName, documentType }) => {
  let docKey;
  if (signatoryName) {
    docKey = documentType + signatoryName + Math.floor(Math.random() * 100000 + 1000);
  } else {
    docKey = documentType + Math.floor(Math.random() * 100000 + 1000);
  }
  return docKey.replace(/\s/g, "");
};

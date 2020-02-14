import differenceBy from "lodash/differenceBy";
import nanoid from "nanoid";

export const concatCompanyDocs = (existDocs, incomeDocs) => {
  const companyDocsDiff = differenceBy(incomeDocs, existDocs, "documentType");

  return [...existDocs, ...companyDocsDiff];
};

export const concatStakeholdersDocs = (neededDocs, { ...uploadedDocs }) => {
  return Object.entries(neededDocs).reduce((acc, [signatoryId, { documents }]) => {
    if (!uploadedDocs[signatoryId]) {
      acc[signatoryId] = {
        documents
      };
    } else {
      acc[signatoryId] = {
        documents: documents.map(neededDocument => {
          return (
            uploadedDocs[signatoryId].find(
              uploadedDoc => uploadedDoc.documentTitle === neededDocument.documentTitle
            ) || neededDocument
          );
        })
      };
    }
    return acc;
  }, {});
};

export const createDocumentMapper = (documentKey, additionalProps) => doc => {
  if (doc.documentKey === documentKey) {
    return { ...doc, ...additionalProps };
  }

  return doc;
};

export const appendDocumentKey = (docs = []) =>
  docs.map(doc => ({ ...doc, documentKey: doc.documentKey || nanoid() }));

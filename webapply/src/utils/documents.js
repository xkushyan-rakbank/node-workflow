import differenceBy from "lodash/differenceBy";
import intersectionBy from "lodash/differenceBy";

export const concatCompanyDocs = (existDocs, incomeDocs) => {
  const companyDocsDiff = differenceBy(incomeDocs, existDocs, "documentType");

  return [...existDocs, ...companyDocsDiff];
};

export const concatStakeholdersDocs = (neededDocs, uploadedDocs) => {
  return Object.entries(neededDocs).reduce((acc, [signatoryId, { documents }]) => {
    acc[signatoryId] = {
      documents: !uploadedDocs[signatoryId]
        ? documents
        : [
            ...intersectionBy(uploadedDocs[signatoryId].documents, documents, "documentKey"),
            ...differenceBy(documents, uploadedDocs[signatoryId].documents, "documentKey")
          ]
    };
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
  docs.map((doc, index) => ({ ...doc, documentKey: doc.documentType + index }));

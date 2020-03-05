import differenceBy from "lodash/differenceBy";
import get from "lodash/get";

const UPLOADED_STATE = "Uploaded";

export const concatCompanyDocs = (existDocs, incomeDocs) => {
  const companyDocsDiff = differenceBy(incomeDocs, existDocs, "documentType");

  return [...existDocs, ...companyDocsDiff];
};

export const concatStakeholdersDocs = (neededDocs, uploadedDocs) => {
  return Object.entries(neededDocs).reduce((acc, [signatoryId, { documents }]) => {
    acc[signatoryId] = {
      documents: documents.map(
        document =>
          get(uploadedDocs, `${signatoryId}.documents`, []).find(
            uploadedDoc =>
              uploadedDoc.documentKey === document.documentKey &&
              uploadedDoc.documentTitle === document.documentTitle
          ) || document
      )
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
  docs.map((doc, index) => {
    const docIndex = docs
      .slice(0, index)
      .filter(document => document.documentType === doc.documentType).length;
    return { ...doc, documentKey: `${doc.documentType}-${docIndex}` };
  });

export const range = (end, start = 0) => Array.from({ length: end - start }, (_, i) => start + i);

export const checkIfRequiredDocsUploaded = docs =>
  Array.isArray(docs) && docs.length
    ? docs.filter(doc => doc.required).every(doc => doc.uploadStatus === UPLOADED_STATE)
    : false;

import differenceBy from "lodash/differenceBy";
import get from "lodash/get";
import { multiDocumentValidation } from "./multiDocumentValidaton";

export const concatCompanyDocs = (existDocs, incomeDocs) => {
  const companyDocsDiff = differenceBy(incomeDocs, existDocs, "documentType");

  return [...(existDocs || []), ...companyDocsDiff];
};

// ro-assist-brd2-1
export const concatStakeholdersDocs = (neededDocs, uploadedDocs) => {
  return Object.entries(neededDocs || {}).reduce(
    (acc, [signatoryId, { documents, personalBankStatements, personalBackground }]) => {
      acc[signatoryId] = {
        documents: documents.map(
          document =>
            get(uploadedDocs, `${signatoryId}.documents`, []).find(
              uploadedDoc =>
                uploadedDoc.documentKey === document.documentKey &&
                uploadedDoc.documentTitle === document.documentTitle
            ) || document
        ),
        personalBankStatements: {
          documents: (get(uploadedDocs, `${signatoryId}.personalBankStatements.documents`, [])
            .length > personalBankStatements.documents.length
            ? get(uploadedDocs, `${signatoryId}.personalBankStatements.documents`, [])
            : personalBankStatements.documents
          ).map(document => {
            return (
              get(uploadedDocs, `${signatoryId}.personalBankStatements.documents`, []).find(
                uploadedDoc =>
                  uploadedDoc.documentKey === document.documentKey &&
                  uploadedDoc.documentTitle === document.documentTitle
              ) || document
            );
          }),
          limit: personalBankStatements.limit
        },
        personalBackground: {
          documents: (get(uploadedDocs, `${signatoryId}.personalBackground.documents`, []).length >
          personalBackground.documents.length
            ? get(uploadedDocs, `${signatoryId}.personalBackground.documents`, [])
            : personalBackground.documents
          ).map(document => {
            return (
              get(uploadedDocs, `${signatoryId}.personalBackground.documents`, []).find(
                uploadedDoc =>
                  uploadedDoc.documentKey === document.documentKey &&
                  uploadedDoc.documentTitle === document.documentTitle
              ) || document
            );
          }),
          limit: personalBackground.limit
        }
      };
      return acc;
    },
    {}
  );
};

export const createDocumentMapper = (documentKey, additionalProps) => doc => {
  if (doc.documentKey === documentKey) {
    return { ...doc, ...additionalProps };
  }

  return doc;
};

export const appendDocumentKey = docs =>
  (docs || []).map((doc, index) => {
    const docIndex = docs
      .slice(0, index)
      .filter(document => document.documentType === doc.documentType).length;
    return { ...doc, documentKey: `${doc.documentType}-${docIndex}` };
  });

// ro-assist-brd2-1
export const appendMultiDocumentKey = (docs, type, organizationInfo, orgKYCDetails) => {
  docs.documents = (docs.documents || []).map((doc, index) => {
    const docIndex = docs.documents
      .slice(0, index)
      .filter(document => document.documentType === doc.documentType).length;
    return { ...doc, documentKey: `${doc.documentType}-${docIndex}` };
  });
  docs.documents = multiDocumentValidation(docs.documents, type, organizationInfo, orgKYCDetails);
  return docs;
};

export const range = (end, start = 0) => Array.from({ length: end - start }, (_, i) => start + i);

import differenceBy from "lodash/differenceBy";
import get from "lodash/get";
import mapValues from "lodash/mapValues";
import { multiDocumentValidation } from "./multiDocumentValidaton";
import { PERSONAL_BANK_STATEMENTS, PERSONAL_BACKGROUND } from "./../constants";

export const concatCompanyDocs = (
  existDocs,
  incomeDocs,
  type = "",
  organizationInfo = {},
  orgKYCDetails = {}
) => {
  const companyDocsDiff = differenceBy(incomeDocs, existDocs, "documentType");
  let docs = [...(existDocs || []), ...companyDocsDiff];
  if (type) {
    docs = multiDocumentValidation(docs, type, organizationInfo, orgKYCDetails);
  }
  return docs;
};

// ro-assist-brd2-1
export const concatStakeholdersDocs = (
  neededDocs,
  uploadedDocs,
  organizationInfo = [],
  orgKYCDetails = []
) => {
  const stakeholdersDocuments = Object.entries(neededDocs || {}).reduce(
    (
      acc,
      [signatoryId, { documents, isDocUpdate, personalBankStatements, personalBackground }]
    ) => {
      acc[signatoryId] = {
        documents: documents.map(
          document =>
            get(uploadedDocs, `['${signatoryId}'].documents`, []).find(
              uploadedDoc =>
                uploadedDoc.documentKey === document.documentKey &&
                uploadedDoc.documentTitle === document.documentTitle
            ) || document
        ),
        isDocUpdate: get(uploadedDocs, `['${signatoryId}']`, {})
          ? get(uploadedDocs, `['${signatoryId}'].isDocUpdate`, false)
          : isDocUpdate,
        personalBankStatements: {
          documents: (get(uploadedDocs, `['${signatoryId}'].personalBankStatements.documents`, [])
            .length > personalBankStatements.documents.length
            ? get(uploadedDocs, `['${signatoryId}'].personalBankStatements.documents`, [])
            : personalBankStatements.documents
          ).map(document => {
            return (
              get(uploadedDocs, `['${signatoryId}'].personalBankStatements.documents`, []).find(
                uploadedDoc =>
                  uploadedDoc.documentKey === document.documentKey &&
                  uploadedDoc.documentTitle === document.documentTitle
              ) || document
            );
          }),
          isDocUpdate: get(uploadedDocs, `['${signatoryId}'].personalBankStatements`, {})
            ? get(uploadedDocs, `['${signatoryId}'].personalBankStatements.isDocUpdate`, false)
            : personalBankStatements.isDocUpdate,
          limit: personalBankStatements.limit
        },
        personalBackground: {
          documents: (get(uploadedDocs, `['${signatoryId}'].personalBackground.documents`, [])
            .length > personalBackground.documents.length
            ? get(uploadedDocs, `['${signatoryId}'].personalBackground.documents`, [])
            : personalBackground.documents
          ).map(document => {
            return (
              get(uploadedDocs, `['${signatoryId}'].personalBackground.documents`, []).find(
                uploadedDoc =>
                  uploadedDoc.documentKey === document.documentKey &&
                  uploadedDoc.documentTitle === document.documentTitle
              ) || document
            );
          }),
          isDocUpdate: get(uploadedDocs, `['${signatoryId}'].personalBackground`, {})
            ? get(uploadedDocs, `['${signatoryId}'].personalBackground.isDocUpdate`, false)
            : personalBackground.isDocUpdate,
          limit: personalBackground.limit
        }
      };
      return acc;
    },
    {}
  );
  const newStakeDocs = mapValues(stakeholdersDocuments, stakeHolder => {
    return {
      ...stakeHolder,
      personalBankStatements: {
        ...stakeHolder.personalBankStatements,
        documents: multiDocumentValidation(
          stakeHolder.personalBankStatements.documents,
          PERSONAL_BANK_STATEMENTS,
          organizationInfo,
          orgKYCDetails
        )
      },
      personalBackground: {
        ...stakeHolder.personalBackground,
        documents: multiDocumentValidation(
          stakeHolder.personalBackground.documents,
          PERSONAL_BACKGROUND,
          organizationInfo,
          orgKYCDetails
        )
      }
    };
  });
  return newStakeDocs;
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
export const appendMultiDocumentKey = docs => {
  const indexedDocs = (docs.documents || []).map((doc, index) => {
    const docIndex = docs.documents
      .slice(0, index)
      .filter(document => document.documentType === doc.documentType).length;
    return { ...doc, documentKey: `${doc.documentType}-${docIndex}` };
  });
  return { ...docs, documents: indexedDocs };
};

export const range = (end, start = 0) => Array.from({ length: end - start }, (_, i) => start + i);

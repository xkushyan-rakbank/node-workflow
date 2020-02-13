import differenceBy from "lodash/differenceBy";
import omit from "lodash/omit";
import get from "lodash/get";
import flatMap from "lodash/flatMap";
import nanoid from "nanoid";

export const concatCompanyDocs = (existDocs, incomeDocs) => {
  const companyDocsDiff = differenceBy(incomeDocs, existDocs, "documentType");

  return [...existDocs, ...companyDocsDiff];
};

export const mergeObjectToCollection = obj =>
  flatMap(obj, (o, key) => o.documents.map(doc => ({ ...doc, key })));

export const concatStakeholdersDocs = (incomeDocs, { ...existDocs }) => {
  const stakeholdersDocsDiff = differenceBy(
    mergeObjectToCollection(incomeDocs),
    mergeObjectToCollection(existDocs),
    "documentKey"
  );

  return stakeholdersDocsDiff.reduce(
    (acc, doc) => ({
      ...acc,
      [doc.key]: [...get(acc, `[${doc.key}].documents`, []), omit(doc, "key")]
    }),
    existDocs
  );
};

export const createDocumentMapper = (documentKey, additionalProps) => doc => {
  if (doc.documentKey === documentKey) {
    return { ...doc, ...additionalProps };
  }

  return doc;
};

export const appendDocumentKey = (docs = []) =>
  docs.map(doc => ({ ...doc, documentKey: doc.documentKey || nanoid() }));

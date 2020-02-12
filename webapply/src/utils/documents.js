import differenceBy from "lodash/differenceBy";
import omit from "lodash/omit";
import nanoid from "nanoid";

export const concatCompanyDocs = (existDocs, incomeDocs) => {
  const companyDocsDiff = differenceBy(incomeDocs, existDocs, "documentType");

  return [...existDocs, ...companyDocsDiff];
};

export const mergeObjectToCollection = obj =>
  Object.keys(obj)
    .map(key =>
      Object.values(obj[key])
        .flat()
        .map(item => ({ ...item, key }))
    )
    .flat();

export const concatStakeholdersDocs = (incomeDocs, { ...existDocs }) => {
  const stakeholdersDocsDiff = differenceBy(
    mergeObjectToCollection(incomeDocs),
    mergeObjectToCollection(existDocs),
    "documentType"
  );

  stakeholdersDocsDiff.forEach(doc => existDocs[doc.key].documents.push(omit(doc, "key")));

  return existDocs;
};

export const createDocumentMapper = (documentType, additionalProps) => doc => {
  if (doc.documentType === documentType) {
    return { ...doc, ...additionalProps };
  }

  return doc;
};

export const appendDocumentKey = docs =>
  Array.isArray(docs)
    ? docs.map(doc => ({ ...doc, documentKey: doc.documentKey || nanoid() }))
    : [];

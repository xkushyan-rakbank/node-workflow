import differenceBy from "lodash/differenceBy";
import omit from "lodash/omit";

export const concatCompanyDocs = (existDocs, incomeDocs) => {
  const companyDocsDiff = differenceBy(incomeDocs, existDocs, "documentType");

  return [...existDocs, ...companyDocsDiff];
};

const mergeObjectToCollection = obj =>
  Object.keys(obj)
    .map(key => {
      let array = Object.values(obj[key])
        .flat()
        .map(item => {
          return { ...item, key };
        });
      return array;
    })
    .flat();

export const concatStakeholdersDocs = (incomeDocs, existDocs) => {
  const stakeholdersDocsDiff = differenceBy(
    mergeObjectToCollection(incomeDocs),
    mergeObjectToCollection(existDocs),
    "documentType"
  );

  stakeholdersDocsDiff.forEach(doc => existDocs[doc.key].documents.push(omit(doc, "key")));

  return existDocs;
};

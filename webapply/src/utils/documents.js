import differenceBy from "lodash/differenceBy";

export const getUniqueCompanyDocs = (existDocs, incomeDocs) => {
  const existDocsKeys = existDocs.reduce(
    (acc, curr) => Object.assign(acc, { [curr.documentType]: curr }),
    {}
  );

  const incomeDocsKeys = incomeDocs.reduce(
    (acc, curr) => Object.assign(acc, { [curr.documentType]: curr }),
    {}
  );

  return [
    ...existDocs.filter(({ documentType }) => !incomeDocsKeys[documentType]),
    ...incomeDocs.filter(({ documentType }) => !existDocsKeys[documentType])
  ];
};

const objectToCollection = obj => {
  return Object.keys(obj)
    .map(key => {
      let array = Object.values(obj[key])
        .flat()
        .map(item => {
          return { ...item, key };
        });
      return array;
    })
    .flat();
};

export const getUniqueStakeholdersDocs = (incomeDocs, existDocs) =>
  differenceBy(objectToCollection(incomeDocs), objectToCollection(existDocs), "documentType");

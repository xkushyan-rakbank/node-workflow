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
